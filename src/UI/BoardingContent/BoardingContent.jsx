import { Radio } from "antd"
import React, { useState } from "react"
// import FlexLayout from "../FlexLayout/FlexLayout";
import CustomInput from "../CustomInput/CustomInput"
import "./boardingContent.scss"
import FlexLayout from "UI/FlexLayout/FlexLayout"

const BoardingContent = ({
  radioBtnArray,
  content_title,
  layouts,
  showTextArea = false,
  isRadioButton = false,
  showNoteText = false,
}) => {
  const [radioValues, setRadioValues] = useState({})

  const handleRadioChange = (group, value) => {
    console.log(`${group} selected: ${value}`)
    setRadioValues(prevState => ({
      ...prevState,
      [group]: value,
    }))
  }

  return (
    <div className="contentWrapp">
      <h2>{content_title}</h2>

      {isRadioButton && (
        <>
          {radioBtnArray?.map(item => (
            <div key={item.id} className="radioBtns">
              <p>
                {item.text} <span className="star">*</span>
              </p>
              <div className="radioGroups">
                <Radio.Group
                  onChange={e => handleRadioChange(item.group, e.target.value)}
                  value={radioValues[item.group]}
                >
                  <Radio value="yes" style={{ color: "#000" }}>
                    Yes
                  </Radio>
                  <Radio value="no" style={{ color: "#000" }}>
                    No
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="inputsWrapp">
        {layouts?.map((layout, index) => (
          <FlexLayout key={index} inputs={layout} />
        ))}
        {showTextArea && (
          <CustomInput
            height="100px"
            inputTitle="Describe the vehicles in your fleet (Brand, Make, Model, & Year)?"
            placeholder="Please provide details about the vehicles in your fleet, including the brand, make, model, and year for each vehicle."
          />
        )}
        {showNoteText && (
          <div className="textsWrapp">
            <h3>
              By clicking 'Next', the following information will be submitted
              for review:
            </h3>
            <ul>
              <li>Company Information </li>
              <li>Fleet Information</li>
              <li>First Chauffeur Information</li>
              <li> First Vehicle Information</li>
            </ul>
            <p>
              Please confirm that the information provided above is accurate, as
              you will not be able to update it once submitted.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BoardingContent
