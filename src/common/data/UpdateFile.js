import DeleteIcon from "assets/fonts/DeleteIcon"
import EditableIcon from "assets/fonts/EditableIcon"
import FileIcon from "assets/fonts/FileIcon"
import React from "react"
import "./UpdateFile.css"
const UpdateFile = ({ isTrue }) => {
  // const [isTrue] = props
  return (
    <div className="AOC-updatefile">
      {/* <FileIcon /> */}
      <DeleteIcon />
      <EditableIcon /> 
    </div>
  )
}

export default UpdateFile
