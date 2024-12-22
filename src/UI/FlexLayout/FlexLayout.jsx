import React from "react";
import "./flexLayout.scss";
import CustomInput from "../CustomInput/CustomInput";

const FlexLayout = ({ inputs }) => {
  return (
    <div className="flexLayoutWrapp">
      <div className="flexLayout">
        {inputs.map((item, index) => (
          <CustomInput
            key={index}
            inputTitle={item.inputTitle}
            placeholder={item.placeholder}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default FlexLayout;
