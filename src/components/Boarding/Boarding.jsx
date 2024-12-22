import React, { useState } from "react"
import { Radio, Steps } from "antd"
import "./Boarding.scss"
import BoardingContent from "../../UI/BoardingContent/BoardingContent"
import {
  flexLayout_data,
  flexLayout_data_2,
  flexLayout_data_3,
  flexLayout_data_4,
  flexLayout_data_5,
  radioBtnArray,
} from "../../Constants"
import GetStartedButton from "../../UI/GetStartedButton/GetStartedButton"
import PartnerTraining from "../PartnerTraining/PartnerTraining"
import PartnerContract from "../PartnerContract/PartnerContract"
import PaymentDetails from "../PaymentDetails/PaymentDetails"
import Summary from "../Summary/Summary"

const Boarding = () => {
  const [current, setCurrent] = useState(0)

  const steps = [
    {
      title: "Fleet Information",
      description: "Provide information about your Fleet.",
    },
    {
      title: "First Vehicle Details",
      description: "Provide upload company document.",
    },
    {
      title: "Partner Training",
      description: "Provide information about partner training.",
    },
    { title: "Partner Contract", description: "Sign partner contract." },
    {
      title: "Payment Details",
      description: "Fill form to provide details about payment.",
    },
    { title: "Summary", description: "Review summary of your application." },
  ]

  const next = () => {
    setCurrent(prev => (prev < steps.length - 1 ? prev + 1 : prev))
  }

  const prev = () => {
    setCurrent(prev => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <div className="mainContainer">
      <div className="BoardingWrapper">
        <div className="overlay" />
        <div className="container_wrapp">
          <div className="BoardingWrapp">
            <Steps
              className="stepWrapper"
              direction="vertical"
              size="small"
              current={current}
              items={steps}
            />
          </div>

          <div className="contentWrapper">
            {current === 0 && (
              <BoardingContent
                content_title="Fleet Information"
                layouts={[flexLayout_data, flexLayout_data_2]}
                radioBtnArray={radioBtnArray}
                isRadioButton={true}
                showTextArea={true}
              />
            )}
            {current === 1 && (
              <BoardingContent
                content_title="First Vehicle Details"
                layouts={[
                  flexLayout_data_3,
                  flexLayout_data_4,
                  flexLayout_data_5,
                ]}
                radioBtnArray={radioBtnArray}
                isRadioButton={false}
                showTextArea={false}
                showNoteText={true}
              />
            )}
            {current === 2 && <PartnerTraining />}
            {current === 3 && <PartnerContract />}
            {current === 4 && <PaymentDetails />}
            {current === 5 && <Summary />}
            <div className="btnsWrapp">
              {current > 0 && (
                <GetStartedButton
                  isNext={false}
                  title="Previous"
                  onClick={prev}
                />
              )}
              {current < steps.length - 1 && (
                <GetStartedButton isNext={true} title="Next" onClick={next} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boarding
