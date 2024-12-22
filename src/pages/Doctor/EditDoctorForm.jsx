import { Input } from "reactstrap"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import userdp from "../../assets/userProfile.svg"
import stampdp from "../../assets/images/pharmacy.png"

import { Select, MenuItem, NativeSelect, InputLabel } from "@material-ui/core"

export const EditDoctorForm = ({ item, getAllDoctors, CloseModel }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ ...item })

  const token = useSelector(state => state.auth.adminToken)

  const [getDesease, setGetDesease] = useState([])

  const [images, setImages] = useState()
  console.log("Images,,,,,", images)
  const [certificate, setCertificate] = useState()
  const [valueoption, setValueOption] = useState([])
  const [selectV, setSelectV] = useState("")

  const SelectVHandler = event => {
    setSelectV(event.target.value)
    console.log(`Selected value ${event.target.value}`)
  }

  useEffect(() => {
    setSelectV(data?.type)
  }, [])

  // console.log('InputLabel',data?.deseases)
  useEffect(() => {
    const arr = data?.deseases.map(item => item?._id)
    setValueOption(arr)
  }, [data])
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
    // console.log("event",event.target.value)
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
    // formData.append("type", selectV);

    // formData.append("status", true)
    formData.append("last_name", data?.last_name)
    formData.append("type", selectV)

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
        route: `doctor/update_doctor_by_admin/${item?.user_id?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status === 200) {
        Swal.fire({
          title: "Doctor is updated successfully",
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

  const getDeseaseFun = async () => {
    try {
      const res = await ApiCall({
        route: `desease/listing_desease`,
        token: token,
        verb: "get",
      })

      if (res?.status == "200") {
        setGetDesease(res?.response?.desease)
        // console.log("--desease--",res?.response?.desease)
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
      <div className="w-[100%] flex justify-center items-center  pt-[20px] pb-[20px]">
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
          <h3 className="text-[#0D0D0D] text-center">Edit Doctor Details</h3>

          <div className="md:px-[0px] px-[10px] flex justify-center md:gap-[25px] sm:flex sm:justify-center">
            <div className="md:w-[25%] w-[40%] md:jusify-unset md:mb-[0px] mb-[20px]  justify-around sm:block  mr-3">
              <center>
                <img
                  src={
                    images
                      ? URL.createObjectURL(images)
                      : data?.profile_image
                      ? data?.profile_image
                      : userdp
                  }
                  className="rounded-[80px] md:h-[130px] h-[120px] md:w-[130px] w-[120px] object-cover flex overflow-hidden"
                  onChange={onFileChange}
                />
                <h3 className="text-gray-500 my-[10px]  text-[14px] ">
                  {" "}
                  Profile image
                </h3>
                <label
                  htmlFor="profile_image"
                  className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#e5eaf6] text-[#012FA7] font-bold rounded-[5px] flex justify-center items-center "
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
                    (certificate && URL.createObjectURL(certificate)) ||
                    data?.certificate
                  }
                  className="rounded-[80px] md:h-[130px] h-[120px] md:w-[130px] w-[120px] object-cover mt-[8px] flex overflow-hidden"
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
            <div className="md:w-[380px] responsiveSelectMui w-[60%] ">
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
                  <option value="">Select Doctor</option>
                  <option value="urgent_care">Urgent-Care Doctor</option>
                  <option value="regular">Regular Doctor</option>
                  <option value="both">Both</option>
                </select>

                <InputLabel
                  id="Please select specialty"
                  style={{ marginTop: "5px", paddingLeft: "9px" }}
                >
                  Please select specialty
                </InputLabel>
                <Select
                  labelId="Please select specialty"
                  mode="tags"
                  multiple
                  size="large"
                  placeholder="Please select specialty"
                  onChange={handleChange}
                  value={valueoption}
                  style={{
                    marginBottom: "0px",
                    width: "100%",
                    paddingLeft: "9px",
                  }}

                  // options={options}
                >
                  {options?.map((item, key) => (
                    //    <option key={key} value={item?.value}>
                    //    {item?.label}
                    //  </option>
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
              {/* <Input
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
              />{" "} */}
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
                  Update & Save
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
