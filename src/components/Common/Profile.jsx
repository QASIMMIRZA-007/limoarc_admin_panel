// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UpdateUserProfile } from "../../Redux/Actions/AuthActions"
import userdp from "../../assets/userProfile.svg"
import stampdp from "../../assets/images/pharmacy.png"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import {
  ListItem,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import { object } from "prop-types"
import "./style.css"
// import { Select } from "@material-ui/core";

export const Profile = ({ role, drType, toggle, getAllDoctors }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)
  const [desease, setDesease] = useState([])
  const [getDesease, setGetDesease] = useState([])

  const [deseaseID, setDeseaseID] = useState([])
  const [valueoption, setValueOption] = useState([])
  const [data, setData] = useState({})
  const [images, setImages] = useState(null)
  const [certificate, setCertificate] = useState(null)
  const [selectV, setSelectV] = useState("")

  const SelectVHandler = event => {
    setSelectV(event.target.value)
    console.log(`Selected value ${event.target.value}`)
  }

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
    console.log("ewf", event.target.value)
    setValueOption(event.target.value)

    // setDeseaseID([...value])
    // const singleDieses = getDesease?.findOne(singleDies=>singleDies?._id == event.target.value)
    //  console.log("singlevalue--->",singleDieses?._id)

    //  const speceID = getDesease?.filter(item=>item._name===)
  }

  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }

  const handleSubmit = async e => {
    dispatch(setLoader(true))
    e.preventDefault()

    const phoneNumberRegex = /^\+?\d{1,15}$/
    const phoneNumber = data?.phone_number ?? ""

    // Contact number validation
    if (!phoneNumberRegex.test(phoneNumber)) {
      Swal.fire(
        "Invalid phone number",
        "Phone number should only contain numbers and an optional + sign, with a maximum of 15 digits.",
        "error"
      )
      dispatch(setLoader(false))
      return
    }

    const formData = new FormData()
    formData.append("first_name", data?.first_name ?? "")

    formData.append("type", selectV ?? "")
    // formData.append("status", true)
    formData.append("last_name", data?.last_name ?? "")

    if (valueoption.length > 1) {
      for (var i = 0; i < valueoption.length; i++) {
        formData.append("deseases", valueoption[i] ?? "")
      }
    } else {
      formData.append("deseases", valueoption[0] ?? "")
      formData.append("deseases", valueoption[0] ?? "")
    }

    formData.append("phone_number", phoneNumber)
    formData.append("email", data?.email ?? "")
    formData.append("qualification", data?.qualification ?? "")
    // formData.append("doctor_type",selectV)
    data?.profile_image && formData.append("profile_image", data?.profile_image)

    // formData.append("type", "regular");
    data?.certificate && formData.append("certificate", data?.certificate)
    try {
      const res = await ApiCall({
        route: "doctor/doctor_signup_by_admin",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status === 200) {
        console.log("doc", res?.response)
        getAllDoctors()
        toggle()
        Swal.fire({
          title: "Doctor Added",
          text: "successfully",
          timer: 1500,
          showConfirmButton: false,
        })
        dispatch(setLoader(false))
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

  useEffect(() => {
    getDeseaseFun()
  }, [])
  // useEffect(()=>{},[])
  // console.log();

  const options = []
  for (let i = 0; i < getDesease.length; i++) {
    options?.push({
      value: getDesease[i]?._id,
      label: getDesease[i]?.desease_name,
    })
  }
  // console.log("options", options)
  return (
    <section>
      {/* <Nav /> */}
      <div className="w-[100%]   flex justify-center items-center  pt-[20px]  pb-[20px] ">
        {/* <h1>Profile Settings</h1> */}
        <form
          className="w-full"
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
              ...(id === "certificate" && { [id]: files[0] }),
            })
          }}
        >
          <h3 className="modalHeadings">{drType}</h3>

          <div className="md:px-[0px] px-[10px] flex justify-center md:gap-[25px] sm:flex sm:justify-center">
            <div className="md:w-[25%] w-[40%] md:jusify-unset md:mb-[0px] mb-[20px]  justify-around sm:block  mr-3 ">
              <center>
                <img
                  src={(images && URL.createObjectURL(images)) || userdp}
                  className="rounded-[10px] md:h-[130px] h-[120px] md:w-[130px] w-[120px] object-cover flex overflow-hidden"
                  onChange={onFileChange}
                />
                <h3 className="text-gray-500 my-[10px]  text-[14px] ">
                  {" "}
                  Profile image
                </h3>
                <label
                  htmlFor="profile_image"
                  className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#fff] text-[#a18552] font-bold rounded-[5px] flex justify-center items-center"
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
                  src={
                    (certificate && URL.createObjectURL(certificate)) || stampdp
                  }
                  className="rounded-[10px] md:h-[130px] h-[120px] md:w-[130px] w-[120px] object-cover mt-[8px] flex overflow-hidden"
                  onChange={onFileChange}
                />
                <h3 className="text-gray-500 my-[10px]  text-[14px] ">
                  {" "}
                  Doctor Stamp
                </h3>
                <label
                  htmlFor="certificate"
                  className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#e5eaf6] text-[#012FA7] font-bold rounded-[5px] flex justify-center items-center"
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
            <div className="md:w-[300px] responsiveSelectMui w-[60%] ">
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
              <>
                <select
                  value={selectV}
                  onChange={SelectVHandler}
                  style={{
                    borderWidth: "1px",
                    borderColor: "#ced4da",
                    marginTop: "10px",
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                    marginBottom: "8px",
                    paddingLeft: "9px",
                  }}
                >
                  <option>Select Doctor</option>
                  <option value={"urgent_care"}>Urgent-Care Doctor</option>
                  <option value={"regular"}>Regular Doctor</option>
                  <option value={"both"}>Both</option>
                </select>

                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <InputLabel
                    id="Please select specialty"
                    style={{ paddingLeft: "9px" }}
                  >
                    Please select specialty
                  </InputLabel>

                  <Select
                    labelId="Please select specialty"
                    mode="tags"
                    size="large"
                    // placeholder="Please select specialty"
                    onChange={handleChange}
                    value={valueoption}
                    multiple
                    style={{
                      // marginBottom: "0px",
                      // width: "100%",
                      paddingLeft: "9px",
                      borderWidth: "1px",
                      borderColor: "#ced4da",
                      borderRadius: "10px",
                    }}

                    // options={options}
                  >
                    {options?.map((item, key) => (
                      <MenuItem
                        a
                        key={key}
                        value={item?.value}
                        className="menuResponse"
                      >
                        {item?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              <div className="text-center addAndSveBtnDoc">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                  }}
                  className="text-gray-50 mt-[55px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px]  "
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
