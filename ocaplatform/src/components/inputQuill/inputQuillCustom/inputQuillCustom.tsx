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
  const [valueHtml, setValueHtml] = useState(""); // Lưu trữ nội dung đã chỉnh sửa
  const quillRef = useRef<ReactQuill>(null); // Tham chiếu đến Quill editor

  useEffect(() => {
    if (quillRef.current && valuePrefix) {
      const quill = quillRef.current.getEditor();

      // Xóa nội dung hiện tại và chèn prefix không thể chỉnh sửa
      if (!valueHtml) {
        quill.setContents(
          new Delta([{ insert: { prefix: valuePrefix } }, { insert: value }])
        );
      }
      quill.on("text-change", (delta, _oldDelta, _source) => {
        const currentContents = quill.getContents();
        const selection = quill.getSelection();
        if (!selection) return;

        const prefixLength = valuePrefix.length;

        // Kiểm tra nếu con trỏ nằm ở phía trước prefix
        if (selection.index < prefixLength) {
          // Chỉ đặt lại con trỏ nếu nó đang nằm trong vùng prefix
          if (selection.index !== prefixLength) {
            quill.setSelection(prefixLength, 0, "silent");
          }
        }

        // Kiểm tra nếu prefix bị xóa, cập nhật nội dung thay vì set lại toàn bộ
        const firstOp = currentContents.ops && currentContents.ops[0];
        if (!firstOp?.insert || !firstOp.insert.prefix) {
          quill.updateContents(
            new Delta([
              { insert: { prefix: valuePrefix } },
              ...(currentContents.ops ? currentContents.ops.slice(1) : []),
            ]),
            "silent"
          );
        }

        // Ngăn chặn việc xóa prefix
        delta.ops &&
          delta.ops.forEach((op) => {
            if (op.delete && selection.index <= prefixLength) {
              quill.updateContents(
                new Delta([{ retain: prefixLength }, { delete: op.delete }]),
                "silent"
              );
            }
          });
      });
    }
  }, [valuePrefix, valueHtml]);

  const handleChange = (
    _value: string,
    _delta: any,
    _source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    // Lưu lại vị trí con trỏ hiện tại

    if (valuePrefix) {
      const textWithoutPrefix = editor
        .getText()
        .replace(valuePrefix as string, "")
        .trim();
      // Kiểm tra nếu nội dung chứa nhiều thẻ <p> do nhấn Enter
      let newContent = `<p><strong>${valuePrefix}</strong><span> ${textWithoutPrefix}</span></p>`;

      // Cập nhật lại nội dung vào state nếu có thay đổi
      if (valueHtml !== newContent) {
        setValueHtml(newContent);
      }

      // kiểm tra nếu có nội dung mới thì thêm class change-value vào thẻ strong
      if (textWithoutPrefix) {
        // xử lí thay thế dùng ref gọi tới editor và dom tới
        if (quillRef.current) {
          const editorRoot = quillRef.current.getEditor().root;
          const strongElement = editorRoot.querySelector(
            ".customEditor .ql-editor strong"
          );
          if (strongElement) {
            strongElement.classList.add("change-value");
          }
        }
      }
    } else {
      const textWithoutPrefix = editor.getText().trim();
      setValueHtml(`<p><span>${textWithoutPrefix}</span></p>`);
    }

    // Lấy nội dung mới đã được chỉnh sửa
    const newText = editor
      .getText()
      .replace(valuePrefix ? valuePrefix : ("" as string), "")
      .trim();

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
        defaultValue={valueHtml}
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
