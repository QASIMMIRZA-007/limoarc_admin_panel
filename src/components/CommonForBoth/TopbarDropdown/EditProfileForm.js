

import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UpdateUserProfile } from "../../../Redux/Actions/AuthActions"
import userdp from "../../../assets/userProfile.svg"
import stampdp from "../../../assets/pharmacy.png"
import { ApiCall } from "../../../Services/apis"
import Swal from "sweetalert2"
import { Input } from "reactstrap"
import { Select } from "@material-ui/core"
import "./ProfileForm.css"
import { setLoader } from "../../../Redux/Actions/GeneralActions"
const EditProfileForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.adminData)
  const token = useSelector(state => state.auth.adminToken)

  const [data, setData] = useState()
  const [profilefname, setProfileFName] = useState(user?.first_name)
  const [profilelname, setProfileLName] = useState(user?.last_name)
  const [images, setImages] = useState(null)

  // console.log("first",images)

  const onFileChange = e => {
    const file = e.target.files[0]
    setImages(file)
  }

  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }

  const handlePassword = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("old_password", data?.old_password)
    formData.append("new_password", data?.new_password)
    formData.append("confirm_password", data?.confirm_password)

    try {
      const res = await ApiCall({
        route: `app_api/change_password`,
        verb: "put",
        token: token,
        params: formData,
      })
      if (res?.status == "200") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password Updated",
          showConfirmButton: false,
          timer: 1500,
        }).then(res => {
          if (res.dismiss) {
            setData({
              old_password: "",
              new_password: "",
              confirm_password: "",
            })
          }
        })
        // dispatch(setLoader(false));
      } else {
        Swal.fire({
          icon: "error",
          title: `Update Failed`,
          text: `${res?.response?.message}`,
        })
        // dispatch(setLoader(false));

        console.log("error", res?.response)
      }
    } catch (e) {
      console.log("saga sign up err --- ", e)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("first_name", profilefname)
    formData.append("last_name", profilelname)
    // formData.append("email", data?.email);
    images && formData.append("profile_image", images)

    dispatch(UpdateUserProfile({ token, id: user?.user_id, data: formData }))
  }
  console.log("data", user)
  return (
    <>

      <section>
      <div className="account-section md:ml-[-30px] mt-[20px]">
          <div className="text-[#fff] text-[24px] flex justify-center mt-[100px] font-medium">
          Admin Profile
        </div>
        {/* <h1>Profile Settings</h1> */}

        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
              // ...(id === "certificate" && { [id]: files[0] }),
            })
          }}
        >
          <div className="md:px-[0px] px-[10px] py-8 md:pl-4 md:flex">
            <div className="md:w-[90%] md:flex md:ml-[40px]  md:mr-[20px] profile-left-container">
              <div className="md:w-[18%] md:ml-[10%] md:jusify-unset md:mb-[0px] mb-[20px]   md:block flex mx-2 profile-left">
                <center>
                  <img
                    src={
                      (images && URL.createObjectURL(images)) ||
                      (user?.profile_image && user?.profile_image) ||
                      userdp
                    }
                    className="rounded-[60px]  md:h-[100px] h-[100px] md:w-[100px] w-[100px] object-cover  flex overflow-hidden"
                    onChange={onFileChange}
                  />
                  <h3 className="text-gray-500 my-[10px]  text-[14px] ">
                    {" "}
                    Profile image
                  </h3>
                  <label
                    htmlFor="profile_image"
                    className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#a18552] text-[#fff] font-bold rounded-[5px] flex justify-center items-center"
                  >
                    Browse Image
                    <input
                      type="file"
                      onChange={onFileChange}
                      id="profile_image"
                      className="shadow-sm   hidden h-[40px] border border-gray-300 text-gray-900 text-xs rounded-2xl bg-[#FBFEFF] h-[40px]  w-full p-2.5 focus:bg-white   "
                      required
                      accept="image/*"
                    />
                  </label>
                </center>

              </div>

              <div className="md:w-[443px] w-[100%] md:w-[60%] md:ml-[2%] ml-[0] profile-left">
                <Input
                  placeholder="First Name"
                  id="first_name"
                  value={profilefname}
                  onChange={e => {
                    setProfileFName(e.target.value)
                  }}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                  }}
                />
                <Input
                  placeholder="Last Name"
                  id="last_name"
                  value={profilelname}
                  onChange={e => {
                    setProfileLName(e.target.value)
                  }}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                  }}
                />
                <Input
                  disabled
                  placeholder="Email"
                  id="email"
                  defaultValue={user?.email}
                  style={{
                    cursor: "not-allowed",
                    marginTop: "10px",
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "#e5eaf6",
                  }}
                />
                <Input
                  placeholder="Old Password"
                  id="old_password"
                  value={data?.old_password}
                  type="password"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                  }}
                />


                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={e => {
                      handleSubmit(e)
                      dispatch(setLoader(true))
                    }}
                    className="text-gray-50 my-[30px] font-medium text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="border-r-[2px] mr-[2%] divider-profile"></div> */}

            {/* <div className="md:w-[700px] w-[100%] md:ml-[20px]  mr-[30px] profile-left password-container">
              <Input
                placeholder="Old Password"
                id="old_password"
                value={data?.old_password}
                type="password"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                }}
              />
              <Input
                placeholder="New Password"
                id="new_password"
                value={data?.new_password}
                type="password"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                }}
              />

              <Input
                placeholder="Confirm Password"
                id="confirm_password"
                value={data?.confirm_password}
                type="password"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                }}
              />

              <div className="flex justify-end font-medium mb-[35px] passwords-button">
                <button
                  type="submit"
                  onClick={e => {
                    handlePassword(e)
                  }}
                  className="text-gray-50 my-[30px] font-medium text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px]"
                >
                  Change Password
                </button>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </section>
    </>
  )
}

export default EditProfileForm
