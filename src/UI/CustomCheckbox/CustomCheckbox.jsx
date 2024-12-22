import React from "react"
import "./CustomCheckbox.scss"

const CustomCheckbox = ({ text, isChecked }) => {
  return (
    <div>
      <label className="material-checkbox">
        <input type="checkbox" value={isChecked} />
        <span className="checkmark"></span>
        {text}
      </label>
    </div>
  )
}

export default CustomCheckbox
