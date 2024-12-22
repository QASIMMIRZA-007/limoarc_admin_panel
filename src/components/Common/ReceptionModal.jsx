import { Input } from "reactstrap"
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import userdp from "../../assets/images/user2.png"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import { InputLabel, NativeSelect } from "@material-ui/core"
import "./style.css"

export const ReceptionModal = ({
  role,
  setRender,
  toggle,
  getAllReceptions,
}) => {
  const [shifttime, setShiftTime] = useState([])
  // console.log("shifttime", shifttime);
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)
  const [valueoption, setValueOption] = useState([])
  const [data, setData] = useState({})
  const [images, setImages] = useState(null)
  const [certificate, setCertificate] = useState(null)

  const onCertificateChange = e => {
    const [certificate] = e.target.files
    setCertificate(certificate)
  }
  const onFileChange = e => {
    const [images] = e.target.files
    setImages(images)
  }

  const handleChange = event => {
    console.log("ewf", event.target.value)
    setValueOption(event.target.value)
  }
  const [selecttime, setSelecttime] = useState("")
  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }

  // const shiftHandler = id => {
  //   setSelecttime([id])
  //   console.log("shifttime--->", selecttime)
  // }
  const handleSubmit = async e => {
    dispatch(setLoader(true))
    e.preventDefault()
    const shift = {
      start_time: data?.start_date,
      end_time: data?.end_date,
    }

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
    formData.append("first_name", data?.first_name)
    formData.append("last_name", data?.last_name)

    formData.append("phone_number", phoneNumber)
    formData.append("email", data?.email)
    // formData.append("shift_id", selecttime)
    data?.profile_image && formData.append("profile_image", data?.profile_image)
    try {
      const res = await ApiCall({
        route: "receiptionist/receiptionist_signup_by_admin",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status === 200) {
        console.log("doc", res?.response)
        toggle()
        getAllReceptions()
        Swal.fire({
          title: "Receptionist is Added",
          text: "Successfully",
          showConfirmButton: true,
          timer: 1500,
        })
        setRender(prev => prev + 1)
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
  const getShifTimeFun = async () => {
    try {
      const res = await ApiCall({
        route: `shift/available_shifts`,
        token: token,
        verb: "get",
      })

      if (res?.status == "200") {
        console.log("res?", res?.response.list)
        setShiftTime(res?.response?.list)
        // console.log("--desease--",res?.response?.desease)
      } else {
        // console.log(res?.response?.message, "error in response ");
        Swal.fire(res?.response?.message, "Try again", "error")
      }
    } catch (e) {
      // console.log(e?.response?.message, "error in response ");
      console.log(e)
    }
  }

  useEffect(() => {
    getShifTimeFun()
  }, [])

  return (
    <section>
      <div className="w-[100%]  flex justify-center items-center pt-[20px] pb-[20px] ">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h2 className="modalHeadings">Add Receptionist</h2>

          <div className="md:px-[0px] flex px-4  sm:flex justify-center pt-[30px] md:gap-[25px] ">
            <div className="md:w-[25%] md:jusify-unset md:mb-[0px] mb-[20px]  justify-around sm:block flex mr-3">
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
                  className="cursor-pointer w-[133px] h-[31px] my-[15px] p-2 bg-[#e5eaf6] text-[#012FA7] font-bold rounded-[5px] flex justify-center items-center"
                >
                  Browse Image
                  <input
                    type="file"
                    name="image"
                    onChange={onFileChange}
                    id="profile_image"
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
              {/* {console.log("shift", selecttime)} */}
              {/* { shifttime && shifttime.length==0 ?<p className="text-[#0D0D0D] mt-[8px]">Time slot not available</p> : <>
              <div>
                Shift Time
                <div className="">
                  {shifttime?.map(shift => (
                    <div
                      onClick={() => {
                        console.log("fdsa")
                        setSelecttime(shift?._id)
                      }}
                      className={
                        selecttime == shift?._id
                          ? " selectedSlotTime"
                          : "  border-2 bg-[#002FA] p-[8px] mt-[8px] rounded-4 inline-table ml-[5px]"
                      }
                    >
                      {new Date(shift?.start_time).toLocaleTimeString() +
                        " " +
                        new Date(shift?.end_time).toLocaleTimeString()}
                    </div>
                  ))}
                </div>
              </div>
            
            </>}   */}
              {/* <Input
                placeholder="Start Time"
                useRef={startref}
                id="start_date"
                type="time"
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "}
              <Input
                placeholder="End Time"
                type="time"
                useRef={endref}
                id="end_date"
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "} */}
              <div className="float-right">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                  }}
                  className="text-gray-50 mt-[55px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Add & Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
