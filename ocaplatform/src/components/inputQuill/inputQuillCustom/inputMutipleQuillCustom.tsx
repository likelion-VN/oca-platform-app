import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./inputQuillCustom.s.scss";

let Delta = Quill.import("delta");

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
PrefixBlot.tagName = "strong";
Quill.register(PrefixBlot);

interface InputQuillDefaultProps {
  valuePrefix?: string;
  disabled: boolean;
  value: string;
  className?: string;
  onKeyDown?: (e: any, index: number) => void;
  id?: string;
  idNewTask?: string;
  handleChangeMutiple?: (value: string, id: string) => void;
}

function InputMutipleQuillCustom({
  valuePrefix = "", // Đặt giá trị mặc định là chuỗi rỗng nếu không có prefix
  disabled,
  value,
  className = "",
  id,
}: InputQuillDefaultProps) {
  const [valueHtml, setValueHtml] = useState(""); // Lưu trữ nội dung đã chỉnh sửa
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Nếu có prefix, chèn prefix và áp dụng các bảo vệ
      if (valuePrefix) {
        quill.setContents(
          new Delta([
            { insert: { prefix: valuePrefix } },
            { insert: "\n" },
            { insert: value },
          ])
        );

        quill.on("text-change", (_delta, _oldDelta, _source) => {
          const currentContents = quill.getContents();
          const selection = quill.getSelection();
          if (!selection) return;

          const prefixLength = valuePrefix.length;

          // Bảo vệ không cho xóa prefix
          if (selection.index < prefixLength) {
            quill.setSelection(prefixLength, 0, "silent");
          }

          if (currentContents.ops && !currentContents.ops[0].insert.prefix) {
            quill.setContents(
              new Delta([
                { insert: { prefix: valuePrefix } },
                ...currentContents.ops.slice(1),
              ])
            );
          }
        });

        quill.on("selection-change", (range) => {
          if (
            range &&
            valuePrefix.length > 0 &&
            range.index < valuePrefix.length
          ) {
            quill.setSelection(valuePrefix.length, 0, "silent");
          }
        });
      } else {
        // Nếu không có prefix, chỉ hiển thị nội dung
        if (value) {
          quill.setText(value);
        }
      }
    }
  }, [valuePrefix, value]);

  useEffect(() => {
    if (quillRef.current && value) {
      // Cập nhật nội dung nếu `value` thay đổi
      quillRef.current.getEditor().setText(value);
      setValueHtml(value);
    }
  }, [value]);

  const handleChange = (
    _value: string,
    _delta: any,
    _source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const textWithoutPrefix = valuePrefix
      ? editor.getText().replace(valuePrefix, "").trim()
      : editor.getText().trim();

    const cleanedContent = textWithoutPrefix.replace(/\n/g, "");
    const newContent = valuePrefix
      ? `<p><strong>${valuePrefix}</strong><span> ${cleanedContent}</span></p>`
      : cleanedContent;

    if (textWithoutPrefix) {
      quillRef?.current?.editor.container
        .querySelector(".ql-editor strong")
        ?.classList.add("change-value");
    }

    if (valueHtml !== newContent) {
      // handleChangeMutiple && id && handleChangeMutiple(textWithoutPrefix, id);
      setValueHtml(newContent);
    }
  };

  return (
    <div className="customEditor">
      <ReactQuill
        id={id}
        className={className}
        readOnly={disabled}
        value={valueHtml}
        ref={quillRef}
        theme="snow"
        onChange={handleChange}
        modules={{
          toolbar: false, // Ẩn toolbar để không sử dụng toolbar
        }}
      />
    </div>
  );
}

export default InputMutipleQuillCustom;
