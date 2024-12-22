import React, { useState } from "react"
import "./partnercontract.scss"
import GetStartedButton from "../../UI/GetStartedButton/GetStartedButton"
import { ReactSVG } from "react-svg"
import { Radio } from "antd"
import { Jhon_Doe } from "assets/IndexSvgs"
const PartnerContract = () => {
  const [radioValues, setRadioValues] = useState({
    agreement: null,
  })

  const handleRadioChange = (group, value) => {
    console.log(`${group} selected: ${value}`)
    setRadioValues(prevState => ({
      ...prevState,
      [group]: value,
    }))
  }
  return (
    <div className="partnerContractWrapper">
      <div className="partnerContractWrapp">
        <div className="flexlay">
          <h2>Partner Contract</h2>
          <GetStartedButton
            isNext={true}
            showIcons={false}
            title="View Contract"
          />
        </div>
        <p>
          Please sign the Partner Contract to finalize your registration with
          LimoArc. This agreement outlines the terms of our partnership and
          ensures a successful collaboration moving forward.
        </p>
        <div className="bigBox">
          <div className="box">
            <span>Sign here please</span>
            <div style={{ padding: "20px 0" }} className="flex al jc">
              <ReactSVG src={Jhon_Doe} />
            </div>

            <div className="btnsWrapp">
              <GetStartedButton showIcons={false} title="Clear" />
              <GetStartedButton showIcons={false} isNext={true} title="Save" />
            </div>
          </div>
        </div>
        <div className="radioGroups">
          <Radio.Group
            onChange={e => handleRadioChange("agreement", e.target.value)}
            value={radioValues.agreement}
          >
            <Radio value="yes" style={{ color: "#fff" }}>
              Yes
            </Radio>
            <Radio value="no" style={{ color: "#fff" }}>
              No
            </Radio>
          </Radio.Group>
        </div>
        <p>
          By clicking "Agree," you accept the terms of the partner agreement and
          provide a digital signature for the contract.
        </p>
      </div>
    </div>
  )
}

export default PartnerContract
