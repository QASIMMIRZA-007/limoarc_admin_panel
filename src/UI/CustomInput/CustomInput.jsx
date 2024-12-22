import React from "react"
import "./customInput.scss"
import { ReactSVG } from "react-svg"
const CustomInput = ({
  svg,
  placeholder,
  type,
  passSvg,
  onClick,
  inputTitle,
  height,
  onChange,
  showStar = true,
  inputStyle,value
}) => {
  return (
    <div className="customInput">
      <span className="span">
        {" "}
        {inputTitle}
        {showStar && <var>*</var>}
      </span>
      <div className="customInputWrapper" style={{ height }}>
        <div className="customInputWrapp">
          <ReactSVG src={svg} />
          <input
            style={inputStyle}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        </div>
        <div onClick={onClick}>{passSvg}</div>
      </div>
    </div>
    // <div class="coolinput">
    //   <label for="input" class="text">
    //     Name:
    //   </label>
    //   <input
    //     type="text"
    //     placeholder="Write here..."
    //     name="input"
    //     class="input"
    //   />
    // </div>
  )
}

export default CustomInput
