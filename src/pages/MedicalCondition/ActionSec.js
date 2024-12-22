import DeleteIcon from 'assets/fonts/DeleteIcon'
import EditableIcon from 'assets/fonts/EditableIcon'
import FileIcon from 'assets/fonts/FileIcon'
import React from 'react'

const ActionSec = () => {
  return (
    <div className='flex gap-[5px]'>
        <select >
            <option>Active</option>
            <option className=''>Deactive</option>

        </select>
        <EditableIcon />
        <DeleteIcon />
    </div>
  )
}

export default ActionSec