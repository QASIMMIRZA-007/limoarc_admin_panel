// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import "./style.css"
import AutocompleteInput from "./AutocompleteInput"

const access_token =
  "pk.eyJ1IjoiaW5hYW0xIiwiYSI6ImNramtmNmljYzJhMWMycnFwM28zOHE4ZzIifQ.pBIP97q3Us332iKImTP9aQ"

export const PharmaciesForm = ({ toggle, getAllPharmacies }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userData)
  const token = useSelector(state => state.auth.adminToken)
  const [data, setData] = useState({})
  const [locate, setLocate] = useState({
    address: "",
    geo_address: "",
    coordinates: [0, 0],
  })
  const [locationLabel, setLocationLabel] = useState("")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let formErrors = {}

    if (!data.pharmacy_name || data.pharmacy_name.trim() === "") {
      formErrors.pharmacy_name = "Pharmacy name is required"
    }

    if (!locate.address || locate.address.trim() === "") {
      formErrors.address = "Address is required"
    }

    if (!locate.geo_address || locate.geo_address.trim() === "") {
      formErrors.geo_address = "Geo location is required"
    }

    const phoneFaxRegex = /^[+]?[\d]+$/

    if (!data.phone_number || data.phone_number.trim() === "") {
      formErrors.phone_number = "Contact Number is required"
    } else if (!phoneFaxRegex.test(data.phone_number)) {
      formErrors.phone_number = "Contact Number can only contain numbers and +"
    } else if (data.phone_number.length > 15) {
      formErrors.phone_number = "Contact Number cannot exceed 15 characters"
    }

    if (!data.fax_number || data.fax_number.trim() === "") {
      formErrors.fax_number = "Fax number is required"
    } else if (!phoneFaxRegex.test(data.fax_number)) {
      formErrors.fax_number = "Fax Number can only contain numbers and +"
    } else if (data.fax_number.length > 15) {
      formErrors.fax_number = "Fax Number cannot exceed 15 characters"
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async e => {
    dispatch(setLoader(true))
    e.preventDefault()

    if (!validateForm()) {
      dispatch(setLoader(false))
      return
    }

    const formData = {
      pharmacy_name: data?.pharmacy_name,
      phone_number: data?.phone_number,
      fax_number: data?.fax_number,
      location: locate,
    }
    try {
      const res = await ApiCall({
        route: "pharmacy/add_pharmacy",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status === 200) {
        console.log("doc", res?.response)
        toggle()
        getAllPharmacies()
        Swal.fire({
          title: "Pharmacy is Added",
          text: "Successfully",
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

  const handleInputChange = (field, value) => {
    setData(prevData => ({
      ...prevData,
      [field]: value,
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: "",
    }))
  }

  const handlePlaceSelect = place => {
    console.log(place)
    setLocationLabel(place?.formatted_address)
    setLocate(prev => ({
      ...prev,
      geo_address: place?.formatted_address,
      coordinates: [place.lng, place.lat],
    }))

    setErrors(prevErrors => ({
      ...prevErrors,
      geo_address: "",
    }))
  }
  return (
    <section>
      <div className="w-[100%] flex justify-center items-center">
        <form
          onChange={({ target: { value, id, files } }) => {
            if (id == "address") {
              setLocate(prev => ({ ...prev, address: value }))
            } else {
              setData({
                ...data,
                ...(id && { [id]: value }),
              })
            }
          }}
        >
          <h2 className="modalHeadings">Add Pharmacy</h2>

          <div className="md:px-[0px] px-[10px] md:flex justify-center pb-[40px]">
            <div className="md:w-[380px] w-[100%] ">
              <label>Pharmacy Name</label>
              <Input
                placeholder="Pharmacy Name"
                id="pharmacy_name"
                value={data.pharmacy_name}
                onChange={e =>
                  handleInputChange("pharmacy_name", e.target.value)
                }
                // defaultValue={data?.pharmacy_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {errors.pharmacy_name && (
                <p className="error">{errors.pharmacy_name}</p>
              )}
              <label style={{ marginTop: "13px " }}>Address</label>
              <Input
                placeholder="Address"
                id="address"
                value={locate.address}
                onChange={e => {
                  setLocate(prev => ({ ...prev, address: e.target.value }))
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    address: "",
                  }))
                }}
                // defaultValue={data?.location?.address}
                style={{
                  marginTop: "3px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  borderRadius: "10px",
                  paddingLeft: "5px",
                  marginBottom: "8px",
                  border: "1px solid #ced4da",
                  color: "#495057",
                  width: "100%",
                }}
              />{" "}
              {errors.address && <p className="error">{errors.address}</p>}
              <>
                <label style={{ marginTop: "10px " }}>Geo Location</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <AutocompleteInput
                    name="geo_address"
                    type="text"
                    placeholder="Search a pharmacy"
                    id="geo_address"
                    onBlur={() => {}}
                    onChange={e => {
                      setLocationLabel(e.target.value)
                    }}
                    value={locationLabel}
                    onPlaceSelect={handlePlaceSelect}
                    style={{
                      marginTop: "3px",
                      height: "42px",
                      borderRadius: "10px",
                      marginBottom: "8px",
                      borderRadius: "10px",
                      paddingLeft: "5px",
                      marginBottom: "8px",
                      paddingRight: "25px",
                      border: "1px solid #ced4da",
                      color: "#495057",
                      width: "100%",
                    }}
                  />
                  <i
                    class="fa-solid fa-location-dot"
                    style={{
                      fontSize: "20px",
                      position: "absolute",
                      right: "10px",
                      top: "15px",
                    }}
                  ></i>
                </div>

                {errors.geo_address && (
                  <p className="error">{errors.geo_address}</p>
                )}
              </>
              <label style={{ marginTop: "13px " }}>Contact Number</label>
              <Input
                placeholder="Contact No"
                id="phone_number"
                value={data.phone_number}
                onChange={e =>
                  handleInputChange("phone_number", e.target.value)
                }
                // defaultValue={data?.phone_number}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "}
              {errors.phone_number && (
                <p className="error">{errors.phone_number}</p>
              )}
              <label style={{ marginTop: "10px " }}>Fax Number</label>
              <Input
                placeholder="Fax no"
                id="fax_number"
                value={data.fax_number}
                onChange={e => handleInputChange("fax_number", e.target.value)}
                // defaultValue={data?.fax_number}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />{" "}
              {errors.fax_number && (
                <p className="error">{errors.fax_number}</p>
              )}
              <div className="float-right">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                    // dispatch(setLoader(true))
                  }}
                  className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
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
