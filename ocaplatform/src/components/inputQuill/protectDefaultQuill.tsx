import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ProtectedDefaultQuillProps {
  id: number;
  value: string;
  newValue: string;
  isRemove: boolean;
  onContentChange: (
    id: number,
    updatedData: { newValue: string; isRemove: boolean }
  ) => void;
}

const ProtectedDefaultQuill: React.FC<ProtectedDefaultQuillProps> = ({
  id,
  value,
  newValue,
  isRemove,
  onContentChange,
}) => {
  const [content, setContent] = useState<string>("");
  const quillRef = useRef<ReactQuill | null>(null);
  const defaultSpan = useRef<string>("");

  // Function escape HTML to prevent XSS
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  useEffect(() => {
    const formattedDefault =
      isRemove || newValue
        ? `<span style="text-decoration: line-through; color: "#B42318"" data-default>${escapeHtml(
            value
          )}</span>`
        : `<span data-default>${escapeHtml(value)}</span>`;
    defaultSpan.current = formattedDefault;
    setContent(formattedDefault + (newValue ? escapeHtml(newValue) : ""));
  }, [value, newValue, isRemove]);

  const handleChange = (
    _valueHTML: string,
    _delta: any,
    _source: string,
    editor: any
  ) => {
    const currentContent: string = editor.getHTML();

    if (!currentContent.startsWith(defaultSpan.current)) {
      if (newValue.trim() === "") {
        onContentChange(id, { newValue: "", isRemove: true });
      } else {
        onContentChange(id, { newValue: newValue, isRemove: false });
      }
      return;
    }

    const text: string = editor.getText();
    const defaultText: string = value + "\n";
    let userInput: string = "";

    if (text.startsWith(defaultText)) {
      userInput = text.replace(defaultText, "").trim();
    } else {
      userInput = text.trim();
    }

    if (userInput) {
      // Có newValue, đặt isRemove = false
      onContentChange(id, { newValue: userInput, isRemove: false });
    } else {
      // Không có newValue, đặt isRemove = true
      onContentChange(id, { newValue: "", isRemove: true });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const { index } = selection;
        if (
          index <= defaultSpan.current.length &&
          (e.key === "Backspace" || e.key === "Delete")
        ) {
          e.preventDefault();
          if (newValue.trim() === "") {
            onContentChange(id, { newValue: "", isRemove: true });
          }
        }
      }
    }
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={content}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      readOnly={false}
      placeholder=""
      modules={{ toolbar: false }}
      formats={[]}
    />
  );
};

export default ProtectedDefaultQuill;
