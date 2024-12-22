// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UpdateUserProfile } from "../../Redux/Actions/AuthActions"
import userdp from "../../assets/images/user2.png"
import stampdp from "../../assets/images/pharmacy.png"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { ListItem, Select, MenuItem, InputLabel } from "@material-ui/core"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import { object } from "prop-types"
import "./style.css"
const MedicalCondition = ({ getDeseaseFun, CloseModel }) => {
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

  const handleSubmit = async e => {
    // CloseModal()
    e.preventDefault()

    console.log(validation.desease_name)
    console.log(data?.desease_name)

    if (!data.desease_name || data.desease_name.trim() === "") {
      setValidation({ ...validation, desease_name: true })
      Swal.fire("Speciality name can not be empty.", "Try again", "error")
      return
    } else {
      setValidation({ ...validation, desease_name: false })
    }

    dispatch(setLoader(true))

    const formData = {
      desease_name: data?.desease_name,
      // description: data?.description,
      // price: {
      //   visit: data?.price,
      //   video_call: data?.price,
      //   urgent_care: data?.price,
      // },
    }

    try {
      const res = await ApiCall({
        route: "desease/add_desease",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status == 200) {
        window.location.reload(true)

        CloseModel()
        getDeseaseFun()
        Swal.fire({
          title: "Medical group is added",
          text: "Successfully",
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
              //   ...(id === "profile_image" && { [id]: files[0] }),
            })
            setValidation({
              ...validation,
              [id]: value === "",
            })
          }}
        >
          <h2 className="modalHeadings ">Add Group</h2>

          <div className="md:px-[0px] px-[10px] mt-[15px] md:flex justify-center">
            <div className=" md:jusify-unset md:mb-[0px] mb-[20px]  justify-around md:block flex mr-3"></div>
            <div className="md:w-[380px] w-[100%] ">
              <Input
                placeholder="Specialty name"
                id="desease_name"
                defaultValue={data?.desease_name}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
                valid={data?.desease_name}
                invalid={validation.desease_name}
              />
              {/* <textarea
                rows="6"
                placeholder="Description "
                id="description"
                defaultValue={data?.description}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  border: "1px solid #ced4da",
                  width: "100%",
                  color: "#495057",
                  paddingLeft: "14px",
                  paddingTop: "8px",
                  height: "40%",
                }}
              /> */}
              {/* <Input
                placeholder="Prices"
                id="price"
                defaultValue={data?.price}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              /> */}
              {/* <Input
                placeholder="Email"
                id="email"
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              /> */}
              <div className="flex justify-center mb-[15px]">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                  }}
                  className="text-gray-50 mt-[20px]  text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
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
export default MedicalCondition
