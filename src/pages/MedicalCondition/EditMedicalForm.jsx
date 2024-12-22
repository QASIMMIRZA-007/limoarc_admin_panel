import { Input } from "reactstrap"
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import userdp from "../../assets/userProfile.svg"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import "./medical.css"

export const EditMedicalForm = ({ item, getDeseaseConditionFun, toggle }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.adminToken)
  const [desease, setDesease] = useState([])
  const [getDesease, setGetDesease] = useState([])
  const [render, setRender] = useState(1)
  const [deseaseID, setDeseaseID] = useState([])
  const [valueoption, setValueOption] = useState([])
  const [data, setData] = useState({ ...item })
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState()
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
  const [file, setFile] = useState(null)
  const onFileChangeFile = e => {
    const [images] = e.target.files
    setFile(images)
  }
  // console.log("dataEdit",data)
  const handleSubmit = async e => {
    dispatch(setLoader(true))
    toggle()
    e.preventDefault()
    const formData = new FormData()
    data?.category_name && formData.append("category_name", data?.category_name)
    data?.overview && formData.append("overview", data?.overview)
    data?.common_symptoms &&
      formData.append("common_symptoms", data?.common_symptoms)
    data?.treatment && formData.append("treatment", data?.treatment)
    data?.description && formData.append("description", data?.description)
    // data?.price && formData.append("price", price)
    data?.profile_image && formData.append("image", data?.profile_image)
    try {
      const res = await ApiCall({
        route: `desease/update_desease_category/${item?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })
      if (res?.status === 200) {
        Swal.fire({
          title: "Updated",
          text: "Disease update successfully",
          timer: 2000,
          showConfirmButton: true,
        })
        dispatch(setLoader(false))
        setRender(prev => prev + 1)
        getDeseaseConditionFun()
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
      <div className="p-[20px]">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h3 className="modalHeadings">Edit Condition Details</h3>
          <div className=" md:jusify-unset md:mb-[0px] mb-[20px]  justify-around  flex ">
            <label
              htmlFor="profile_image"
              className="cursor-pointer w-[133px]   p-2  text-[#012FA7] font-bold rounded-[5px] flex justify-center items-center"
            >
              <center className="flex justify-center items-center">
                <img
                  src={item?.image || userdp}
                  className="rounded-[10px] md:h-[110px] h-[120px] md:w-[130px] w-[120px]  rounded-[50%] flex overflow-hidden"
                  onChange={onFileChange}
                />
                {/* <figure className="m-[auto] absolute text-[16px]">+</figure>  */}
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
            <div className="w-[50%]">
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
               value={price}
               onChange={(e)=>{setPrice(e.target.value)}}
                style={{
                  height:"42px",
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
          <div className="float-right">
            <button
              type="submit"
              onClick={e => {
                handleSubmit(e)
                dispatch(setLoader(true))
              }}
              className="text-gray-50 mt-[25px]  text-[15px]  md:mb-[20px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
            >
              Update & Save
            </button>
          </div>

          {/* <div className="md:px-[0px] px-[10px] mt-[15px] flex sm:flex justify-center">
            <div className="md:w-[380px] w-[100%] ">
              <Input
                placeholder="Medical Condition"
                id="category_name"
                defaultValue={data?.category_name}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Overview "
                id="overview"
                defaultValue={data?.overview}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Common symptoms"
                id="common_symptoms"
                defaultValue={data?.common_symptoms}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Treatment"
                id="treatment"
                defaultValue={data?.treatment}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Description"
                id="description"
                defaultValue={data?.description}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Input
                placeholder="Prices"
                id="price"
                defaultValue={data?.price?.visit}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <div className="float-right">
                <button
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                    dispatch(setLoader(true));
                  }}
                  className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Update & Save
                </button>
              </div>
            </div>
          </div> */}
        </form>
      </div>
    </section>
  )
}
