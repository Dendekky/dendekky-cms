import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const QuillWYSIWYG = ({ id, setRawHtml, value }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
 
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "font",
    "align",
    "clean",
    "link",
    "image",
  ]

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      id={id}
      // name="rawHtml"
      value={value}
      onChange={setRawHtml}
      className="add-new-post__editor mb-1"
    />
  )
}

export default QuillWYSIWYG
