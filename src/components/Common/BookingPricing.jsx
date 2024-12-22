// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import "./style.css"
const BookingPricing = ({ getAllBooking, CloseModel }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)
  const [desease, setDesease] = useState([])
  const [getDesease, setGetDesease] = useState([])

  const [deseaseID, setDeseaseID] = useState([])
  const [valueoption, setValueOption] = useState([])
  const [data, setData] = useState({})
  const [validation, setValidation] = useState({})
  const [images, setImages] = useState(null)
  const [certificate, setCertificate] = useState(null)
  const [render, setRender] = useState(1)

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

  useEffect(async () => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: "price/get_price",
        token: token,
        verb: "get",
      })
      if (res?.status == 200) {
        console.log(res)
        setData({
          urgent: res?.response?.price?.urgent_care,
          video_call: res?.response?.price?.video_call,
          in_person: res?.response?.price?.visit,
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Couldn't get booking",
        text: "Error",
        timer: 1500,
      })
      // setRender(prev=>prev+1)
    }
    dispatch(setLoader(false))
  }, [])

  const handleSubmit = async e => {
    // CloseModal()
    e.preventDefault()

    if (data.urgent === "") {
      setValidation({ ...validation, urgent: true })
      return
    }
    if (data.in_person === "") {
      setValidation({ ...validation, in_person: true })
      return
    }
    if (data.video_call === "") {
      setValidation({ ...validation, video_call: true })
      return
    }

    dispatch(setLoader(true))

    const formData = {
      urgent_care: data?.urgent,
      video_call: data?.video_call,
      visit: data?.in_person,
    }

    try {
      const res = await ApiCall({
        route: "price/add_price",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status == 200) {
        window.location.reload(true)

        CloseModel()
        getAllBooking()
        Swal.fire({
          title: "Booking pricing set",
          text: "successfully",
          timer: 1500,
          showConfirmButton: true,
        })
        // setRender(prev=>prev+1)
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

  return (
    <section>
      <div className="w-[100%]  flex justify-center items-center">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
            })
            setValidation({
              ...validation,
              [id]: value === "",
            })
          }}
        >
          <h2 className="modalHeadings ">Booking Pricing</h2>

          <div className="md:px-[0px] px-[10px] mt-[15px] md:flex justify-center">
            <div className=" md:jusify-unset md:mb-[0px] mb-[20px]  justify-around md:block flex mr-3"></div>
            <div className="md:w-[380px] w-[100%] ">
              <label>Urgent care (¥)</label>
              <Input
                placeholder="Urgent care price"
                id="urgent"
                type="number"
                defaultValue={data?.urgent}
                style={{
                  marginTop: "3px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
                valid={data?.urgent}
                invalid={validation.urgent}
              />
              <label style={{ marginTop: "10px " }}>In-Person (¥)</label>
              <Input
                placeholder="In-Person price"
                id="in_person"
                type="number"
                defaultValue={data?.in_person}
                style={{
                  marginTop: "3px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
                valid={data?.in_person}
                invalid={validation.in_person}
              />{" "}
              <label style={{ marginTop: "10px " }}>Video call (¥)</label>
              <Input
                placeholder="Video call price"
                id="video_call"
                type="number"
                defaultValue={data?.video_call}
                style={{
                  marginTop: "3px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
                valid={data?.video_call}
                invalid={validation.video_call}
              />
              <div className="float-right mb-[15px]">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                  }}
                  className="text-gray-50 mt-[20px]  text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Set & Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
export default BookingPricing
