import React, { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import validator from "validator";
// import validator from "validator";
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import Otp from "./Otp"
import { ApiCall } from "../../../Services/apis"
// import Nav from "../../../components/Patient/Nav/Nav";
import { Input } from "reactstrap"
import "../Login.css"
import Logo from "../../../assets/images/AmericanClinicLoginLogo.svg"

const ForgotPassword = () => {
  // const navigate = useNavigate();
  const [otpform, setOtpform] = useState(true)
  const [data, setData] = useState({})
  const [emailError, setEmailError] = useState("")
  // console.log("data",data?.email)
  // const emailvalidation = () => {
  //   if (validator.isEmail(data.email)) {
  //     setEmailError("");
  //   } else {
  //     setEmailError("Invalid Email");
  //   }
  // };

  const email = data?.email
  const handleSubmitOtp = async ({ e, otp }) => {
    e.preventDefault()

    if (otp <= 4) {
      Swal.fire("Invalid OTP", "Try again", "error")
    } else {
      const data = { otp, email }
      try {
        // await verifyEmail(data);
        // navigate("/ResetPassword");
      } catch (error) {
        Swal.fire("connection err", "Try again", "error")
      }
    }
  }

  const sendOTP = async () => {
    if (emailError !== "" || !data.email || data.email === "") {
      setEmailError("please enter your email")
      return
    }
    try {
      const res = await ApiCall({
        route: `app_api/email_verification`,
        verb: "put",
        params: { email: data.email, role: "admin" },
      })

      if (res?.status == "200") {
        setOtpform(false)
      } else {
        Swal.fire(res?.response?.message, "", "error")
      }
    } catch (e) {
      Swal.fire(e?.response?.message, "Try again", "error")
    }
  }

  return (
    <>
      {/* <Nav /> */}
      <div className="">
        <div
          className="h-[15vh] back-color w-[100vw]"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/admin/dashboard">
            <img src={Logo}></img>
          </Link>
        </div>
      </div>

      <div className="pt-9 pb-24 md:w-[45%] mx-auto">
        <div>
          <div className="card-shadow bg-transparent rounded px-[40px] pt-[30px]">
            {otpform ? (
              <div>
                {" "}
                <div className="flex justify-center">
                  <div className="w-[100%]">
                    <h1 className="text-[#a18552] text-center md:text-[38px] leading-[54px] font-semibold line-hei">
                      Forgot password?
                    </h1>
                    <h2
                      className="text-[#2F2E2E] pt-[10px] text-center text-[16px] leading-[20px] mt-[20px]"
                      style={{ lineHeight: "24px" }}
                    >
                      We will send a password reset link to the email address
                      given below. Please visit that link to reset your password
                    </h2>
                  </div>
                </div>
                <div>
                  <form
                    onChange={({ target: { value, id } }) => {
                      setData({
                        ...data,
                        ...(id && { [id]: value }),
                      })

                      if (value) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        const isValidEmail = emailPattern.test(value)
                        setEmailError(isValidEmail ? "" : "Invalid email")
                      }
                    }}
                  >
                    <div className="mb-3 pt-[10px]">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={data?.email}
                        placeholder="Email address"
                        required
                        valid={data.email}
                        invalid={emailError !== "" || data.email === ""}
                        style={{
                          marginTop: "30px",
                          width: "100%",
                          height: "42px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>

                    <div className=" pt-4 pb-8 flex justify-center pb-7 ">
                      {/* <Link to='/ResetPassword' > */}{" "}
                      <button
                        onClick={e => {
                          e.preventDefault()
                          sendOTP(e)
                        }}
                        // disabled={
                        //   emailError !== "" || !data.email || data.email === ""
                        // }
                        type="submit"
                        className="text-white my-2  bg-[#a18552]   outline-0  font-medium rounded-xl text-sm px-12 h-[50px] text-center  "
                      >
                        Send OTP
                      </button>{" "}
                      {/* </Link> */}
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <Otp
                  setOtpform={setOtpform}
                  handleSubmitOtp={handleSubmitOtp}
                  email={data?.email}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
