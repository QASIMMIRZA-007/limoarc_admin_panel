import { Input } from "reactstrap"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import userdp from "../../assets/userProfile.svg"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import "./style.css"
const AddCondition = ({ item, setRender, toggle, getDeseaseConditionFun }) => {
  // console.log("item--->>", item);
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
    // console.log("ewf", event.target.value);
    setValueOption(event.target.value)
  }

  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }

  const handleSubmit = async e => {
    dispatch(setLoader(true))

    e.preventDefault()

    const formData = new FormData()
    data?.category_name && formData.append("category_name", data?.category_name)

    data?.overview && formData.append("overview", data?.overview)
    data?.common_symptoms &&
      formData.append("common_symptoms", data?.common_symptoms)
    data?.treatment && formData.append("treatment", data?.treatment)
    data?.description && formData.append("description", data?.description)
    data?.profile_image && formData.append("image", data?.profile_image)

    try {
      const res = await ApiCall({
        route: `desease/add_desease_category/${item?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status == 200) {
        getDeseaseConditionFun()
        toggle()
        setRender(prev => prev + 1)
        Swal.fire({
          title: "Medical Condition added",
          Text: "successfully",
          timer: 1500,
          showConfirmButton: true,
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

  return (
    <section>
      <div className=" p-[20px]">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h3 className="modalHeadings">Add New Condition</h3>
          <div className=" md:jusify-unset md:mb-[0px] mb-[20px]  justify-around  flex ">
            <label
              htmlFor="profile_image"
              className="cursor-pointer w-[133px]   p-2  text-[#012FA7] font-bold rounded-[5px] flex justify-center items-center"
            >
              <center className="flex justify-center items-center">
                <img
                  src={(images && URL.createObjectURL(images)) || userdp}
                  className="rounded-[10px] md:h-[110px] h-[120px] md:w-[130px] w-[120px]  rounded-[50%] flex overflow-hidden"
                  onChange={onFileChange}
                />

                <input
                  type="file"
                  onChange={onFileChange}
                  id="profile_image"
                  className="shadow-sm   hidden h-[40px] border border-gray-300 text-gray-900 text-xs rounded-2xl bg-[#FBFEFF] h-[40px]  w-full p-2.5 focus:bg-white   "
                  required
                  accept="image/*"
                />
              </center>
            </label>
          </div>

          <div className="w-[100%] flex gap-[10px]">
            <div className="w-[100%] ">
              <label className="ml-[4px]"> Medical Condition</label>
              <Input
                placeholder="Medical Condition"
                id="category_name"
                defaultValue={data?.category_name}
                style={{
                  height: "42px",
                  borderRadius: "10px",
                }}
              />
            </div>
            {/* <div className="w-[50%]">
              <label className="ml-[4px]">Price
              </label>
              <Input
                placeholder="Price"
                id="price"
                defaultValue={data?.price?.visit}
                style={{
                  height: "42px",
                  borderRadius: "10px",
                }}
                type="number"
              />
              </div> */}
          </div>
          <div className="w-[100%] flex  gap-[10px] mt-[10px]">
            <div className="w-[50%]">
              <label className="ml-[4px]"> Overview</label>
              <Input
                type="textarea"
                placeholder="Overview "
                id="overview"
                defaultValue={data?.overview}
                style={{
                  height: "80px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="w-[50%]">
              <label className="ml-[4px]"> Common symptoms</label>
              <Input
                type="textarea"
                placeholder="Common Symptoms "
                id="common_symptoms"
                defaultValue={data?.common_symptoms}
                style={{
                  height: "80px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
          <div className="w-[100%] flex  gap-[10px] mt-[10px]">
            <div className="w-[50%]">
              <label className="ml-[4px]"> Treatment</label>
              <Input
                type="textarea"
                placeholder="Treatment "
                id="treatment"
                defaultValue={data?.treatment}
                style={{
                  height: "80px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="w-[50%]">
              <label className="ml-[4px]"> Description</label>
              <Input
                type="textarea"
                placeholder="Description"
                id="description"
                defaultValue={data?.description}
                style={{
                  height: "80px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
          <div className="w-[100%] mt-[10px]"></div>

          <div className="float-right">
            <button
              type="submit"
              onClick={e => {
                handleSubmit(e)
                dispatch(setLoader(true))
              }}
              className="text-gray-50 mt-[25px]  text-[15px]  md:mb-[20px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
            >
              Add & Save
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
export default AddCondition
