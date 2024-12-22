import { Input } from "reactstrap"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import eyeIcon from "../../assets/eye-password.svg"
import eyeShow from "../../assets/eye-show.svg"

import userdp from "../../assets/userProfile.svg"
import stampdp from "../../assets/images/pharmacy.png"

import { Select, MenuItem, NativeSelect, InputLabel } from "@material-ui/core"

export const ChnagePasswordForm = ({ item, getAllDoctors, CloseModel }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()
  const [data, setData] = useState({
    new_password: "",
    confirm_password: "",
  })
  const [validations, setValidations] = useState({
    new_password: true,
    confirm_password: true,
  })

  const token = useSelector(state => state.auth.adminToken)

  const handleSubmit = async e => {
    e.preventDefault()

    // Check if all fields are valid
    if (!isFormValid()) {
      return
    }

    dispatch(setLoader(true))
    CloseModel()

    const formData = new FormData()
    formData.append("new_password", data?.new_password)
    formData.append("confirm_password", data?.confirm_password)

    console.log(item)
    let userId

    if (item.user_id._id) {
      userId = item.user_id._id
    } else {
      userId = item.user_id
    }

    try {
      const res = await ApiCall({
        route: `app_api/change_user_password_by_admin/${userId}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status === 200) {
        Swal.fire({
          title: "Password is updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
        getAllDoctors()
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga doctor add error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  const isFormValid = () => {
    // Check if any field is empty
    const isValid = Object.values(data).every(value => value.trim() !== "")

    // Update validation state for each field
    setValidations({
      new_password: data.new_password.trim() !== "",
      confirm_password: data.confirm_password.trim() !== "",
    })

    return isValid
  }

  const handleInputChange = ({ target: { value, id, files } }) => {
    setData({
      ...data,
      [id]: value,
    })

    // Update validation state for the changed field
    setValidations({
      ...validations,
      [id]: value.trim() !== "",
    })
  }

  return (
    <section>
      <div className="w-[100%] flex justify-center items-center  pt-[20px] pb-[20px]">
        <form className="w-full" onSubmit={handleSubmit}>
          <h3 className="py-[30px]  text-[#0D0D0D] text-center">
            Update Password
          </h3>

          <div className="md:px-[0px] px-[10px] flex justify-center md:gap-[25px] sm:flex sm:justify-center">
            <div className="md:w-[380px]  w-[390px] ">
              <Input
                placeholder="New Password"
                id="new_password"
                type={!showPassword ? "password" : "text"}
                value={data.new_password}
                onChange={handleInputChange}
                required
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  width: "100%",
                }}
                valid={
                  validations.new_password &&
                  data.new_password.trim().length > 0
                }
                invalid={!validations.new_password}
              />
              <img
                className="ml-[auto] mr-[30px] transform translate-y-[-35px] cursor-pointer"
                src={showPassword ? eyeShow : eyeIcon}
                width={"15px"}
                height={"15px"}
                onClick={() => setShowPassword(!showPassword)}
              />

              <Input
                placeholder="Confirm Password"
                id="confirm_password"
                type={!showConfirmPassword ? "password" : "text"}
                value={data.confirm_password}
                onChange={handleInputChange}
                required
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
                valid={
                  validations.confirm_password &&
                  data.confirm_password.trim().length > 0
                }
                invalid={!validations.confirm_password}
              />
              <img
                className="ml-[auto] mr-[30px] transform translate-y-[-35px] cursor-pointer"
                src={showConfirmPassword ? eyeShow : eyeIcon}
                width={"15x"}
                height={"15px"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <div className="float-right">
                <button
                  type="submit"
                  className="text-gray-50 mt-[25px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
