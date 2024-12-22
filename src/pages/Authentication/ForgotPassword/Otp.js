import React, { useState } from "react"
import OtpInput from "react-otp-input"
import { useHistory } from "react-router-dom"

import Swal from "sweetalert2"
import { ApiCall } from "../../../Services/apis"

const Otp = ({ setOtpform, email }) => {
  const history = useHistory()
  const [verification_code, setverification_code] = useState("")
  const [codeError, setCodeError] = useState("")
  console.log("verification_code", verification_code)
  const handleSubmitOtp = async () => {
    if (verification_code.length < 6) {
      setCodeError("Please enter 6 digits")
      return
    }
    try {
      const res = await ApiCall({
        route: `app_api/code_verification`,
        verb: "post",
        params: { verification_code, email },
      })

      if (res?.status == "200") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "OTP verified  ",
          showConfirmButton: true,
          timer: 30000,
        })
        history.push("/reset-password")
      } else {
        Swal.fire("OTP do not match ", "Try again", "error")
      }
    } catch (e) {
      Swal.fire("invalid OTP  ", "Try again", "error")
    }
  }

  const handleSubmit = async e => {
    if (email === "") {
      return
    }
    try {
      const res = await ApiCall({
        route: `app_api/email_verification`,
        verb: "put",
        params: { email: email },
      })

      if (res?.status == "200") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "OTP sent",
          showConfirmButton: true,
          timer: 3000,
        })
      } else {
        Swal.fire(res?.response?.message, "Try again", "error")
      }
    } catch (e) {
      Swal.fire(e?.response?.message, "Try again", "error")
    }
  }

  return (
    <>
      {" "}
      <>
        <div>
          <div className="flex justify-center">
            <div className="w-[80%]">
              <h1 className="text-[#2F2E2E] text-center text-[45px] leading-[64px] font-semibold ">
                Enter OTP
              </h1>
              <h2 className="text-[#2F2E2E] py-[10px] text-center text-[14px] leadind-[200%]  ">
                We sent OTP to the email address . Please check your email.
              </h2>
            </div>
          </div>
          <div>
            <form>
              <div className="mb-3 pt-[40px]">
                <div className="flex justify-center">
                  {/* <input 
                  type="text"
                  maxLength={6}
                  value={verification_code}
                  onChange={handleChange}
                  style={{
                    width:'100%',
                    border: "2px solid #000",
                    borderRadius: "8px",
                    fontSize: "18px",
                      color: "#000",
                      fontWeight: "400",
                      background: "#ffff",
                      caretColor: "blue",
                    
                  }}
                  /> */}
                  <OtpInput
                    value={verification_code}
                    onChange={setverification_code}
                    numInputs={6}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    inputStyle={{
                      border: "2px solid #000",
                      borderRadius: "8px",
                      width: "50px",
                      height: "50px",
                      fontSize: "18px",
                      color: "#000",
                      fontWeight: "400",
                      background: "#ffff",
                      caretColor: "blue",
                    }}
                    focusStyle={{
                      border: "3px solid #a18552",
                      outline: "none",
                    }}
                  />
                </div>
                {codeError && (
                  <p className="text-center mt-[10px] text-[red]">
                    {codeError}
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-[20px] cursor-pointer ">
                <div onClick={() => setOtpform(true)}>
                  {" "}
                  <h2 className="text-sm text-[#a18552] ">Change Email</h2>{" "}
                </div>
              </div>

              <div className="flex justify-center mt-[10px] cursor-pointer ">
                {" "}
                <h2
                  onClick={e => {
                    e.preventDefault()
                    handleSubmit(e)
                    setverification_code(null)
                  }}
                  className="text-sm text-[#a18552] "
                >
                  Resend OTP
                </h2>{" "}
              </div>

              <div className=" py-8 flex justify-center   ">
                {/* <Link to='/ResetPassword' > */}{" "}
                <button
                  onClick={e => {
                    e.preventDefault()
                    handleSubmitOtp({ e, verification_code })
                  }}
                  type="submit"
                  className="text-white my-6  bg-[#a18552]   outline-0  font-medium rounded-xl text-sm px-12 h-[50px] text-center  "
                >
                  Reset password
                </button>{" "}
                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  )
}

export default Otp
