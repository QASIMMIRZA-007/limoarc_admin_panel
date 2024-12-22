import React from "react";
import "./FormsButton.scss";

const FormsButton = ({ title, handleClick,style }) => {
  return (
    <div className="formsButtonwrapp">
      <button style={style} className="button" onClick={handleClick}>
        {title}
      </button>
    </div>
  );
};

export default FormsButton;
