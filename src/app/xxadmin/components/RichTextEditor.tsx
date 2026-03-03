'use client';

import React, { useState } from "react";
import ReactQuill from "react-quill-new"; // pas besoin de css importé
import "react-quill-new/dist/quill.snow.css"; // ✅ Import CSS obligatoire
type Props = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
};

export default function RichTextEditor({
                                           value = "",
                                           onChange,
                                           placeholder = "Write something...",
                                           readOnly = false,
                                       }: Props) {
    const [editorValue, setEditorValue] = useState(value);

    const handleChange = (content: string) => {
        setEditorValue(content);
        onChange?.(content);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image", "code-block"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold", "italic", "underline", "strike", "blockquote",
        "list", "bullet", "indent",
        "link", "image", "code-block",
    ];

    return (
        <div className="rich-text-editor">
            <ReactQuill
                value={editorValue}
                onChange={handleChange}
                placeholder={placeholder}
                readOnly={readOnly}
                modules={modules}
                formats={formats}
                //style={{ minHeight: 400 }}
                style={{ minHeight: "96px" }}
                tabIndex={4}
                theme="snow"
            />
        </div>
    );
}
