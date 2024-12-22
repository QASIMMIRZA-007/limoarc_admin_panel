import React from "react"
import "./UrgentInprogress.css"
const UrgentInprogress = props => {
  return (
    <div className={props.style}>
      <span>{props.value}</span>
    </div>
  )
}

export default UrgentInprogress
