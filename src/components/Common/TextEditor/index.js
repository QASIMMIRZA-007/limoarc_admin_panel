import React, { useState } from "react"
import "./textEditor.scss"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const TextEditor = ({ content, setContent }) => {
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ]

  return (
    <div className="react-quil-container">
      <ReactQuill
        value={content}
        onChange={html => setContent(html)}
        theme="snow"
        // modules={{
        //   toolbar: [
        //     [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
        //     [{ list: "ordered" }, { list: "bullet" }],
        //     ["bold", "italic", "underline"],
        //     ["link"],
        //   ],
        // }}
        // formats={formats}
      />
    </div>
  )
}

export default TextEditor
