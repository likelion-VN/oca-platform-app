import { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
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
Quill.register(PrefixBlot); // Đăng ký blot

interface InputQuillDefaultProps {
  valuePrefix?: string;
}

function InputQuillCustom({ valuePrefix }: InputQuillDefaultProps) {
  const [valueHtml, setValueHtml] = useState(""); // Lưu trữ nội dung đã chỉnh sửa
  const quillRef = useRef<ReactQuill>(null); // Tham chiếu đến Quill editor

  useEffect(() => {
    if (quillRef.current && valuePrefix) {
      const quill = quillRef.current.getEditor();
      // Xóa nội dung hiện tại và chèn prefix không thể chỉnh sửa
      quill.setContents(
        new Delta([{ insert: { prefix: valuePrefix } }, { insert: "\n" }])
      );

      // Ngăn chặn việc xóa prefix
      quill.on("text-change", (_delta, _oldDelta, _source) => {
        const currentContents = quill.getContents();
        const selection = quill.getSelection();
        if (!selection) return;

        const prefixLength = valuePrefix.length;

        // Kiểm tra nếu con trỏ nằm ở phía trước prefix hoặc đang cố gắng xóa prefix
        if (selection.index < prefixLength) {
          // Đặt lại con trỏ ở phía sau prefix
          quill.setSelection(prefixLength, 0, "silent");
        }

        // Kiểm tra nếu người dùng cố gắng xóa prefix
        if (currentContents.ops && !currentContents.ops[0].insert.prefix) {
          quill.setContents(
            new Delta([
              { insert: { prefix: valuePrefix } },
              ...currentContents.ops.slice(1),
            ])
          );
        }
      });

      // Sự kiện khi editor được focus
      quill.on("selection-change", (range) => {
        if (range && range.index < valuePrefix.length) {
          // Đặt con trỏ ngay sau prefix khi editor được focus
          quill.setSelection(valuePrefix.length, 0, "silent");
        }
      });
    }
  }, [valuePrefix]);

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
        .trim(); // Loại bỏ valuePrefix
      // Loại bỏ ký tự xuống dòng (nếu có)
      const cleanedContent = textWithoutPrefix.replace(/\n/g, "");
      const newContent = `<p><strong>${valuePrefix}</strong><span> ${cleanedContent}</span></p>`; // Tạo cấu trúc mới

      // kiểm tra nếu có nội dung mới thì thêm class change-value vào thẻ strong
      if (textWithoutPrefix) {
        document
          .querySelector(".customEditor .ql-editor strong")
          ?.classList.add("change-value");
      }

      // Tránh việc cập nhật quá mức nếu không cần thiết
      if (valueHtml !== newContent) {
        setValueHtml(newContent); // Chỉ cập nhật khi nội dung thay đổi
      }
    }
  };

  return (
    <div className="customEditor">
      <ReactQuill
        value={valueHtml}
        ref={quillRef}
        theme="snow"
        onChange={handleChange} // Theo dõi sự thay đổi nội dung
        modules={{
          toolbar: false, // Ẩn toolbar để không sử dụng toolbar
        }}
      />
    </div>
  );
}

export default InputQuillCustom;
