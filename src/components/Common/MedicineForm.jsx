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
import { ListItem, Select, MenuItem, InputLabel } from "@material-ui/core"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import { object } from "prop-types"
import "./style.css"

export const MedicineForm = ({ toggle, getAllMedicine }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)
  const [desease, setDesease] = useState([])
  const [getDesease, setGetDesease] = useState([])

  const [deseaseID, setDeseaseID] = useState([])
  const [deseaseoption, setDeseaseOption] = useState([])
  const [categoryoption, setCategoryOption] = useState([])
  const [data, setData] = useState({})
  const [images, setImages] = useState(null)
  const [certificate, setCertificate] = useState(null)
  // console.log("deseaseoption",deseaseoption)
  const onCertificateChange = e => {
    const [certificate] = e.target.files
    setCertificate(certificate)
  }
  const onFileChange = e => {
    const [images] = e.target.files
    setImages(images)
  }

  const deseaseHandler = event => {
    // console.log("first",[...deseaseoption,event.target.value])

    setDeseaseOption(event.target.value)
  }

  const categoryHandler = event => {
    setCategoryOption(event.target.value)
  }

  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }
  const selectedCategory = getDesease?.find(
    cat => cat?._id === deseaseoption
  )?.categories

  const categoryOptions = selectedCategory?.map(cat => ({
    label: cat?.category_name,
    value: cat?._id,
  }))
  const handleSubmit = async e => {
    dispatch(setLoader(true))
    e.preventDefault()
    const formData = new FormData()
    if (data?.medicine_name) {
      formData.append("medicine_name", data?.medicine_name)
    } else {
      console.log("enter deases name")
    }
    for (let i = 0; i < deseaseoption?.length; i++) {
      if (deseaseoption?.length > 1) {
        formData.append("desease_id", deseaseoption[i])
      } else {
        formData.append("desease_id", deseaseoption[i])
        formData.append("desease_id", deseaseoption[i])
      }
    }
    data?.instruction && formData.append("instruction", data?.instruction)

    data?.description && formData.append("description", data?.description)

    try {
      const res = await ApiCall({
        route: "medicine/add_medicine",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status === 200) {
        toggle()
        getAllMedicine()
        Swal.fire({
          title: "Medication is added",
          text: "Successfully",
          timer: 1500,
          showConfirmButton: true,
        })
        dispatch(setLoader(false))
      } else {
        if (res.response.message.startsWith("Disease")) {
          Swal.fire(
            "Speciality is required",
            "Fill the required filed",
            "error"
          )
        } else {
          Swal.fire(res.response.message, "Fill the required filed", "error")
        }
        // if (res.response.message.startsWith("description")) {
        //   Swal.fire("Description is required", "error")
        // } else if (res.response.message === "Medicine name is required") {
        //   Swal.fire("Medicine name is required", "error")
        // } else if (res.response.message.startsWith("desease_id")) {
        //   Swal.fire("Atleast 1 speciality is required", "error")
        // } else if (res.response.message.startsWith("instruction")) {
        //   Swal.fire("Instruction is required", "error")
        // } else {
        //   Swal.fire("Something went wrong", "Please try again", "error")
        // }
        dispatch(setLoader(false))
      }
    } catch (e) {
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

  const deseaseselect = []
  for (let i = 0; i < getDesease.length; i++) {
    deseaseselect?.push({
      value: getDesease[i]?._id,
      label: getDesease[i]?.desease_name,
    })
  }
  const categoryselect = []
  for (let i = 0; i < getDesease.length; i++) {
    categoryselect?.push({
      value: getDesease[i]?.categories[i]?._id,
      label: getDesease[i]?.categories[i]?.category_name,
    })
  }

  return (
    <section>
      <div className="w-[100%] flex justify-center items-center pt-[20px] pb-[20px]">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h3 className="modalHeadings">Add Medications</h3>
          <div className="md:px-[0px] px-[10px] flex sm:flex justify-center md:gap-[25px]">
            <div className="md:w-[380px] w-[100%] ">
              <Input
                placeholder="Medication"
                id="medicine_name"
                defaultValue={data?.medicine_name}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <>
                <InputLabel
                  style={{
                    fontSize: "14px",
                    color: "#495057",
                    marginLeft: "12px",
                    marginTop: "12px",
                  }}
                >
                  Select Speciality
                </InputLabel>
                <Select
                  mode="tags"
                  size="large"
                  id="desease_id"
                  defaultValue={data?.desease_id}
                  disableUnderline={true}
                  onChange={deseaseHandler}
                  value={deseaseoption}
                  multiple={true}
                  style={{
                    marginBottom: "8px",
                    width: "100%",
                    border: "1px solid #ced4da",
                    borderRadius: "10px",
                    paddingLeft: "12px",
                    paddingTop: "6px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {deseaseselect?.map((item, key) => (
                    <MenuItem key={key} value={item?.value}>
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </>
              <textarea
                rows="4"
                placeholder="Instruction"
                id="instruction"
                defaultValue={data?.instruction}
                style={{
                  marginTop: "8px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  border: "1px solid #ced4da",
                  color: "#495057",
                  width: "100%",
                }}
              />
              <textarea
                rows="4"
                placeholder=" Description"
                id="description"
                defaultValue={data?.description}
                style={{
                  // marginTop: "10px",
                  borderRadius: "10px",
                  // marginBottom: "8px",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  border: "1px solid #ced4da",
                  color: "#495057",
                  width: "100%",
                }}
              />{" "}
              {deseaseoption?.length < 1 && data?.desease_name == " " ? (
                <div className="float-right">
                  <button
                    disabled
                    type="submit"
                    onClick={e => {
                      handleSubmit(e)
                      dispatch(setLoader(true))
                    }}
                    className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#B0DAFF] rounded-[10px] "
                  >
                    Add & Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={e => {
                        handleSubmit(e)
                        dispatch(setLoader(true))
                      }}
                      className="text-gray-50 mt-[20px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                    >
                      Add & Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
