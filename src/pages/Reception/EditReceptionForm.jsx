import { Input } from "reactstrap"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import userdp from "../../assets/userProfile.svg"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import './reception.css'
export const EditReceptionForm = ({
  role,
  item,
  getAllReceptions,
  CloseModal,
}) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)
  const [valueoption, setValueOption] = useState([])
  const [data, setData] = useState({ ...item })
  const [images, setImages] = useState(null)
  const [certificate, setCertificate] = useState(null)
  const [shifttime, setShiftTime] = useState([item?.shift_id])
console.log('s',shifttime)
  const [selecttime, setSelecttime] = useState(item?.shift_id?._id)
  // const shiftHandler = id => {
  //   setSelecttime([id])
  
  // }

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

  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(setLoader(true))

    // const shift = {
    //   start_time: data?.start_date,
    //   end_time: data?.end_date,
    // }
    const formData = new FormData()
    formData.append("first_name", data?.first_name)
    formData.append("last_name", data?.last_name)

    formData.append("phone_number", data?.phone_number)
    // formData.append("shift_id", selecttime)
    // formData.append("email", data?.email);
    
    data?.profile_image && formData.append("profile_image", data?.profile_image)
    console.log("resItem---> ", item)

    try {
      const res = await ApiCall({
        route: `receiptionist/update_receiptionist_by_admin/${item?.user_id?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status === 200) {
        window.location.reload()
        Swal.fire({
          title: 'Updated',
          text: 'receptionist details updated successfully',
          timer:2000,
          showConfirmButton
        })
        CloseModal()
        getAllReceptions()
        // dispatch(setLoader(true))
        console.log("doc", res?.response)
       
     
       
        // dispatch(setLoader(false))
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
        setShiftTime([...shifttime,...res?.response?.list])
        // console.log("--desease--",res?.response?.desease)
      } else {
        // console.log(res?.response?.message, "error in response ");
        Swal.fire(res?.response?.message, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      // console.log(e?.response?.message, "error in response ");
      console.log(e)
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    getShifTimeFun()
  }, [])
  return (
    <section>
      <div className="w-[100%] flex justify-center items-center pt-[10px] pb-[40px]">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h3 className="modalHeadings">
            Edit Receptionist Details
          </h3>
          <div className="md:px-[0px] flex px-2 sm:flex justify-center md:gap-[25px]">
            <div className="md:w-[25%] md:jusify-unset md:mb-[0px] mb-[20px]  justify-around md:block flex mr-3">
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


             {/* {shifttime && shifttime.length==0 ? <p className="text-[#0D0D0D] mt-[8px]">Time slot not available</p> : <>
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
                          : "  border-2 bg-[#002FA] p-[8px] mt-[8px] rounded-4 inline-table ml-[5px] cursor-pointer"
                      }
                    >
                      {new Date(shift?.start_time).toLocaleTimeString() +
                        " " +
                        new Date(shift?.end_time).toLocaleTimeString()}
                    </div>
                  ))}
                </div>
              </div>
             </>}  */}


              {/* <Input
                placeholder="Email"
                id="email"
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "} */}
              {/* <Input
                placeholder="Start Time"
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
                    CloseModal()
                    // dispatch(setLoader(true))
                  }}
                  className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Update & Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
