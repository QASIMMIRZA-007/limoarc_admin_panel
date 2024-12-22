import { Input } from "reactstrap"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import userdp from "../../assets/images/user2.png"
import stampdp from "../../assets/images/pharmacy.png"

import { Select, MenuItem } from "@material-ui/core"

export const ViewBookingForm = ({ item, getAllBooking, CloseModel }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ ...item })

  const token = useSelector(state => state.auth.adminToken)

  const [getDesease, setGetDesease] = useState([])

  const [images, setImages] = useState(data?.profile_image)
  const [certificate, setCertificate] = useState(data?.certificate)
  const [valueoption, setValueOption] = useState([])

  const onCertificateChange = e => {
    const [certificate] = e.target.files
    setCertificate(certificate)
  }
  const onFileChange = e => {
    const [images] = e.target.files
    setImages(images)
  }

  // setSpecialties(user?.deseases);
  const handleChange = event => {
    setValueOption(event.target.value)
  }

  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }

  const handleSubmit = async e => {
    dispatch(setLoader(true))
    CloseModel()
    e.preventDefault()

    const formData = new FormData()
    formData.append("first_name", data?.first_name)

    // formData.append("status", true)
    formData.append("last_name", data?.last_name)

    if (valueoption.length > 1) {
      for (var i = 0; i < valueoption.length; i++) {
        formData.append("deseases", valueoption[i])
      }
    } else {
      formData.append("deseases", valueoption[0])
      formData.append("deseases", valueoption[0])
    }

    formData.append("phone_number", data?.phone_number)

    formData.append("qualification", data?.qualification)
    data?.profile_image && formData.append("profile_image", data?.profile_image)

    data?.certificate && formData.append("certificate", data?.certificate)
    try {
      const res = await ApiCall({
        route: `doctor/update_doctor/${item?.user_id}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status === 200) {
        Swal.fire(`${res.response.message}`, "suc", "success")
        getAllBooking()
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga doctor add error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  const getDeseaseFun = async () => {
    try {
      const res = await ApiCall({
        route: `desease/listing_desease`,
        token: token,
        verb: "get",
      })

      if (res?.status == "200") {
        setGetDesease(res?.response?.desease)
      } else {
        // console.log(res?.response?.message, "error in response ");
        Swal.fire(res?.response?.message, "Try again", "error")
      }
    } catch (e) {
      // console.log(e?.response?.message, "error in response ");
      console.log(e)
      Swal.fire(e?.response?.message, "Try again", "error")
    }
  }

  const options = []
  for (let i = 0; i < getDesease.length; i++) {
    options?.push({
      value: getDesease[i]?._id,
      label: getDesease[i]?.desease_name,
    })
  }
  useEffect(() => {
    getDeseaseFun()
  }, [])

  return (
    <section>
      <div className="w-[100%] h-[500px] md:ml-[-30px] mt-[20px]">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
              ...(id === "certificate" && { [id]: files[0] }),
            })
          }}
        >
          <div className="md:px-[0px] px-[10px] mt-[15px] md:flex justify-center">
            <div className="md:w-[25%] md:jusify-unset md:mb-[0px] mb-[20px]  justify-around md:block flex mr-3">
              <center>
                <img
                  src={images || userdp}
                  className="rounded-[10px] md:h-[130px] h-[120px] md:w-[130px] w-[120px] object-cover flex overflow-hidden"
                  onChange={onFileChange}
                />
                <h3 className="text-gray-500 my-[10px]  text-[14px] ">
                  {" "}
                  Profile image
                </h3>
                <label
                  htmlFor="profile_image"
                  className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#e5eaf6] text-[#012FA7] font-bold rounded-[5px] "
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
              <center>
                <img
                  src={certificate || stampdp}
                  className="rounded-[10px] md:h-[130px] h-[120px] md:w-[130px] w-[120px] object-cover mt-[8px] flex overflow-hidden"
                  onChange={onFileChange}
                />
                <h3 className="text-gray-500 my-[10px]  text-[14px] ">
                  {" "}
                  Doctor Stamp
                </h3>
                <label
                  htmlFor="certificate"
                  className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#e5eaf6] text-[#012FA7] font-bold rounded-[5px] "
                >
                  Browse Image
                  <input
                    type="file"
                    onChange={onCertificateChange}
                    id="certificate"
                    className="shadow-sm   hidden h-[40px] border border-gray-300 text-gray-900 text-xs rounded-2xl bg-[#FBFEFF] h-[40px]  w-full p-2.5 focus:bg-white   "
                    required
                    accept="image/*"
                  />
                </label>
              </center>
            </div>
            <div className="md:w-[380px] w-[100%] ">
              <Input
                placeholder="First Name"
                id="first_name"
                defaultValue={data?.first_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Last Name"
                id="last_name"
                defaultValue={data?.last_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {/* antd select multiple */}
              <>
                <br />

                <br />
                {/* <InputLabel >Please select specialty</InputLabel> */}
                <Select
                  mode="tags"
                  size="large"
                  placeholder="Please select specialty"
                  onChange={handleChange}
                  value={valueoption}
                  multiple
                  style={{
                    marginBottom: "8px",
                    width: "100%",
                  }}

                  // options={options}
                >
                  {options?.map((item, key) => (
                    <MenuItem key={key} value={item?.value}>
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </>
              <Input
                placeholder="Contact No"
                id="phone_number"
                defaultValue={data?.phone_number}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "}
              <Input
                placeholder="Email"
                id="email"
                disabled
                defaultValue={data?.email}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "}
              <Input
                placeholder="Qualification "
                id="qualification"
                defaultValue={data?.qualification}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {/* <input
                type="file"
                // value={user?.certificate}
                onChange={onFileChangeFile}
                placeholder="certificate "
                id="certificate"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                }}
                className="rounded-[10px] py-2 font-normal border border-gray-300  text-[14px]"
              /> */}
              <div className="float-right">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                    dispatch(setLoader(true))
                  }}
                  className="text-gray-50 mt-[55px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Add & Save
                </button>
              </div>
            </div>
            {/* <div className="md:w-[363px] w-[100%] md:ml-[20px]">
              <Input
                placeholder="Old Password"
                id="old_password"
                type="password"
                //   value={data?.first_name}
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
                type="password"
                //   value={data?.last_name}
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
                type="password"
                //   value={user?.email}
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                }}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={(e) => {
                    handlePassword(e);
                    // dispatch(setLoader(true));s
                  }}
                  className="signup-btn md:mb-[0px] mb-[15px]"
                >
                  Update Password
                </button>
              </div> */}
            {/* </div> */}
          </div>
        </form>
      </div>
    </section>
  )
}
