import React, { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"

const DropZone = ({ files, setFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const thumbs = files.map((file) => (
    <div className="dz-thumb" key={file.name}>
      <div className="dz-thumb-inner">
        <img src={file.preview} className="dz-img" alt={file.name} />
      </div>
    </div>
  ))

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <p className="mx-1">
            Drag 'n' drop the post image here, or click to select files
          </p>
        ) : null}
        <div className="thumb-container">{thumbs}</div>
      </div>
    </section>
  )
}

export default DropZone
