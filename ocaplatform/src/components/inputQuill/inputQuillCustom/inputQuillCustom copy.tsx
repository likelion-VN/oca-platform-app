import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./inputQuillCustom.s.scss";

let Delta = Quill.import("delta");

// Custom blot để ngăn chặn việc xóa prefix
const Embed = Quill.import("blots/embed");
class PrefixBlot extends Embed {
  static create(value: string) {
    const node = super.create();
    node.innerHTML = `<strong>${value}</strong>`;
    return node;
  }

  static value(node: HTMLElement) {
    return node.innerHTML;
  }
}

PrefixBlot.blotName = "prefix";
PrefixBlot.tagName = "strong"; // Định nghĩa thẻ HTML sẽ sử dụng (strong)
Quill.register(PrefixBlot);

interface InputQuillDefaultProps {
  valuePrefix?: string;
  value: string;
  disabled: boolean;
  onChange?: (value: string) => void;
  id?: string;
  onKeyDown?: (e: any) => void;
  className?: string;
  handleChangeMutiple?: (value: string, id: string) => void;
}

function InputQuillCustom({
  valuePrefix,
  value,
  disabled,
  onChange,
  id,
  onKeyDown,
  className,
  handleChangeMutiple,
}: InputQuillDefaultProps) {
  const [valueHtml, setValueHtml] = useState(value); // Đặt state ban đầu với value
  const quillRef = useRef<ReactQuill>(null); // Tham chiếu đến Quill editor

  useEffect(() => {
    if (quillRef.current && valuePrefix) {
      const quill = quillRef.current.getEditor();
      // const index = quill.getLength();

      // Chỉ thiết lập nội dung nếu chưa có nội dung (tránh thiết lập lại mỗi lần nhập liệu)
      if (!valueHtml) {
        quill.setContents(
          new Delta([{ insert: { prefix: valuePrefix } }, { insert: value }])
        );
      }

      quill.on("selection-change", (range) => {
        if (range && range.index < valuePrefix.length) {
          // Đặt con trỏ ngay sau prefix khi editor được focus
          quill.setSelection(valuePrefix.length, 0, "silent");
        }
      });
    }
  }, [valuePrefix, valueHtml]); // Cập nhật useEffect khi valuePrefix hoặc valueHtml thay đổi

  const handleChange = (
    _value: string,
    _delta: any,
    _source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    if (valuePrefix) {
      const textWithoutPrefix = editor
        .getText()
        .replace(valuePrefix as string, "")
        .trim();
      const newContent = `<p><strong>${valuePrefix}</strong><span> ${textWithoutPrefix}</span></p>`; // Tạo cấu trúc mới

      // Kiểm tra sự khác biệt trước khi cập nhật state (tránh cập nhật không cần thiết)
      if (valueHtml !== newContent) {
        setValueHtml(newContent);
      }
    } else {
      const textWithoutPrefix = editor.getText().trim();
      setValueHtml(`<p><span>${textWithoutPrefix}</span></p>`);
    }

    const newText = editor
      .getText()
      .replace(valuePrefix ? valuePrefix : ("" as string), "")
      .trim();

    // Chỉ gọi onChange khi có sự thay đổi nội dung
    if (value !== newText) {
      onChange && onChange(newText);
      handleChangeMutiple && id && handleChangeMutiple(newText, id.toString());
    }
  };

  return (
    <div className="customEditor">
      <ReactQuill
        className={className}
        id={id ? id : ""}
        defaultValue={valueHtml} // Sử dụng defaultValue thay vì value
        readOnly={disabled}
        ref={quillRef}
        theme="snow"
        onKeyDown={onKeyDown}
        onChange={handleChange} // Theo dõi sự thay đổi nội dung
        modules={{
          toolbar: false, // Ẩn toolbar để không sử dụng toolbar
        }}
      />
    </div>
  );
}

export default InputQuillCustom;
