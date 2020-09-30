import React from "react"
import ReactQuill, { Quill } from "react-quill"
import CKEditor from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const QuillWYSIWYG = ({ id, setRawHtml, value }) => {
  const Size = Quill.import("formats/size")
  Size.whitelist = ["extra-small", "small", "medium", "large"]
  Quill.register(Size, true)

  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font")
  Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
  ]
  Quill.register(Font, true)

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [
        { list: "ordered" },
        { list: "bullet" },
        { script: "sub" }, // superscript/subscript
        { script: "super" },
      ],

      ["blockquote", "code-block"],

      [{ align: [] }, { indent: "-1" }, { indent: "+1" }], // outdent/indent

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["link", "image", "video"],

      [{ direction: "rtl" }], // text direction

      ["clean"],
    ],
  }

  const formats = [
    "header",
    "bold",
    "size",
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
    "video",
  ]

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      id={id}
      value={value}
      onChange={setRawHtml}
      className="add-new-post__editor mb-1"
    />
  )
}

export const CKWYSIWYG = () => (
  <CKEditor
    editor={ClassicEditor}
    data="<p>Hello from CKEditor 5!</p>"
    onInit={(editor) => {
      // You can store the "editor" and use when it is needed.
      console.log("Editor is ready to use!", editor)
    }}
    onChange={(event, editor) => {
      const data = editor.getData()
      console.log({ event, editor, data })
    }}
    onBlur={(event, editor) => {
      console.log("Blur.", editor)
    }}
    onFocus={(event, editor) => {
      console.log("Focus.", editor)
    }}
  />
)

export default QuillWYSIWYG
