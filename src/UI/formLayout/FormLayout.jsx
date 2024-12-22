import React, { useState } from "react"
import "./formLayout.scss"
import { Link, useNavigate } from "react-router-dom"
import CustomInput from "../../UI/CustomInput/CustomInput"
import { FaRegEyeSlash } from "react-icons/fa"
import { IoEyeOutline } from "react-icons/io5"
import { ReactSVG } from "react-svg"

import FormsButton from "../FormsButton/FormsButton"
import { logo } from "assets/IndexSvgs"
const FormLayout = ({
  backgroundImage,
  form_title,
  form_text,
  inputs_fields,
  btnTitle,
  inputs_fields_2,
  isLengthyForm = false,
  title_1,
  title_2,
  height,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const handleLogoClick = () => {
    navigate("/")
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!verified) {
      alert("Please complete the reCAPTCHA")
      return
    }
    alert("Form submitted successfully!")
    // Proceed with form submission logic here
  }

  // const inputs = [
  //   {
  //     id: 1,
  //     input: (
  //       <CustomInput
  //         svg={emailIcon}
  //         placeholder="Email"
  //         passSvg={null}
  //         type="text"
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     input: (
  //       <CustomInput
  //         svg={passwordIcon}
  //         placeholder="Password"
  //         passSvg={isPasswordVisible ? <IoEyeOutline /> : <FaRegEyeSlash />}
  //         type={isPasswordVisible ? "text" : "password"}
  //         onClick={togglePasswordVisibility}
  //       />
  //     ),
  //     rememberText: false,
  //   },
  // ];

  return (
    <div className="formLayoutWrapper">
      <div className="formLayoutWrapp">
        <div className="customFormWrapper">
          <div className="customFormWrapp">
            <div className="bgWrapp">
              <div
                className="background"
                style={{ background: `url(${backgroundImage})`, height }}
              />
              <div className="overlay" />
            </div>
            <div className="formWrapper">
              <div className="formWrapp">
                <div className="logoWrapp">
                  <div className="logo" onClick={handleLogoClick}>
                    <ReactSVG src={logo} />{" "}
                  </div>
                </div>
                <div className="formHeader">
                  <h1>{form_title}</h1>
                  <p>{form_text}</p>
                </div>
                <form className="form">
                  <h1>{title_1}</h1>
                  {inputs_fields.map(({ id, input }) => (
                    <div key={id} className="inputWrapper">
                      {input}
                    </div>
                  ))}

                  {isLengthyForm && (
                    <>
                      <h1>{title_2}</h1>
                      {inputs_fields_2.map(({ id, input }) => (
                        <div key={id} className="inputWrapper">
                          {input}
                        </div>
                      ))}
                    </>
                  )}

                  <FormsButton title={btnTitle} />
                  {isLengthyForm && (
                    <p>
                      By creating an account you agree to our{" "}
                      <Link>Privacy Policy</Link> and <Link>Term Of Use</Link>{" "}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLayout
