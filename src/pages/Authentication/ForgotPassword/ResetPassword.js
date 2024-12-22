// import { TextField } from "@mui/material";
import { Input } from "reactstrap"
import React, { useState } from "react"
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
// import validator from "validator";
// import Nav from "../../../../components/Patient/Nav/Nav";
import { ApiCall } from "../../../Services/apis"
import Logo from "../../../assets/images/AmericanClinicLoginLogo.svg"

const ResetPassword = () => {
  // const navigate = useNavigate();
  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")

  const validate = value => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage(" ")
    } else {
      setErrorMessage(
        "Password must be Uppecase Lowercase and Special characters  (min 8)  "
      )
    }
  }

  const handleSubmit = async () => {
    const password = data?.password
    const confirm_password = data?.confirm_password
    const email = JSON.parse(localStorage.getItem("email"))
    if (password == confirm_password) {
      try {
        const res = await ApiCall({
          route: `app_api/reset_password`,
          verb: "put",
          params: { password, confirm_password, email },
        })

        if (res?.status == "200") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password Updated ",
            showConfirmButton: true,
            timer: 30000,
          })
          localStorage.removeItem("email")
          // navigate("/Login");
        } else {
          Swal.fire("Password can't update ", "Try again", "error")
        }
      } catch (e) {
        Swal.fire(" Password can't update", "Try again", "error")
      }
    } else {
      Swal.fire("Password Doesn’t Match", "Try again", "error")
    }
  }

  return (
    <>
      {/* <Nav /> */}
      <div className="container-lg mx-auto">
        <div
          className="h-[15vh] back-color"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href="/admin">
            <img src={Logo}></img>
          </a>
        </div>
      </div>
      <div className="pt-9 pb-24 md:w-[45%] mx-auto">
        <div>
          <div className="card-shadow bg-transparent rounded px-[40px] pt-[30px]">
            <div className="flex justify-center">
              <div className="w-[80%]">
                <h1 className="text-[#a18552] text-center md:text-[40px] leading-[64px] font-semibold ">
                  Reset password
                </h1>
              </div>
            </div>

            <div>
              <form
                onChange={({ target: { value, id } }) =>
                  setData({ ...data, ...(id && { [id]: value }) })
                }
              >
                <div className=" ">
                  <Input
                    type="password"
                    value={data?.password}
                    id="password"
                    placeholder="New password *"
                    required
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      height: "42px",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div className=" pt-[15px]">
                  <Input
                    type="password"
                    value={data?.confirm_password}
                    id="confirm_password"
                    placeholder="Confirm new password *"
                    required
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      height: "42px",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div className=" pt-12 pb-8 flex justify-center pb-7 ">
                  {" "}
                  <button
                    onClick={e => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                    type="submit"
                    className="text-white my-6  bg-[#a18552]   outline-0  font-medium rounded-xl text-sm px-12 h-[55px] text-center  "
                  >
                    Update password
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
