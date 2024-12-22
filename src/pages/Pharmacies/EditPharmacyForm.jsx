// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import "./pharmacy.css"
import AutocompleteInput from "components/Common/AutocompleteInput"

const access_token =
  "pk.eyJ1IjoiaW5hYW0xIiwiYSI6ImNramtmNmljYzJhMWMycnFwM28zOHE4ZzIifQ.pBIP97q3Us332iKImTP9aQ"

export const EditPharmacyForm = ({
  item,
  CloseModal,
  toggle,
  getAllPharmacies,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userData)
  const token = useSelector(state => state.auth.adminToken)
  const [data, setData] = useState({ ...item })
  const [locate, setLocate] = useState({
    geo_address: data?.location?.geo_address,
    address: data?.location?.address,
    coordinates: [
      data?.location?.coordinates[0],
      data?.location?.coordinates[1],
    ],
  })
  const [locationLabel, setLocationLabel] = useState(
    data?.location?.geo_address
  )

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    const phoneFaxPattern = /^[0-9+]*$/

    if (!data.pharmacy_name) {
      newErrors.pharmacy_name = "Pharmacy name is required"
    }
    if (!locate.address) {
      newErrors.address = "Address is required"
    }
    if (
      !phoneFaxPattern.test(data.phone_number) ||
      data.phone_number.length > 15
    ) {
      newErrors.phone_number =
        "Contact number should be only numbers and maximum of 15 digits and may include '+' sign."
    }
    if (!phoneFaxPattern.test(data.fax_number) || data.fax_number.length > 15) {
      newErrors.fax_number =
        "Fax number should be only numbers and maximum of 15 digits and may include '+' sign."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validate()) return

    dispatch(setLoader(true))

    const formData = {
      pharmacy_name: data?.pharmacy_name,
      phone_number: data?.phone_number,
      fax_number: data?.fax_number,
      location: locate,
    }
    try {
      const res = await ApiCall({
        route: `pharmacy/update_pharmacy/${item?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })
      console.log("item", item)

      if (res?.status === 200) {
        toggle()
        Swal.fire({
          title: "Pharmacy is Updated",
          text: "Successfully",
          timer: 1500,
          showConfirmButton: true,
        })
        getAllPharmacies()

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

  const handlePlaceSelect = place => {
    console.log(place)
    setLocationLabel(place?.formatted_address)
    setLocate(prev => ({
      ...prev,
      geo_address: place?.formatted_address,
      coordinates: [place.lng, place.lat],
    }))
  }

  return (
    <section>
      <div className="w-[100%] flex justify-center items-center ">
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
          <h2 className="modalHeadings">Edit Pharmacy Details</h2>

          <div className="md:px-[0px] px-[10px] mt-[15px] md:flex justify-center pb-[22px]">
            <div className="md:w-[380px] w-[100%] ">
              <label>Pharmacy Name</label>
              <Input
                placeholder="Pharmacy Name"
                id="pharmacy_name"
                defaultValue={data?.pharmacy_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {errors.pharmacy_name && (
                <div className="text-red-500">{errors.pharmacy_name}</div>
              )}

              <label style={{ marginTop: "13px " }}>Address</label>
              <Input
                placeholder="address"
                id="address"
                defaultValue={data?.location?.address}
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
              />
              {errors.address && (
                <div className="text-red-500">{errors.address}</div>
              )}

              <>
                <label style={{ marginTop: "10px " }}>Geo Location</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AutocompleteInput
                    name="geo_address"
                    type="text"
                    placeholder="Search a pharmacy"
                    id="geo_address"
                    onBlur={() => {}}
                    onChange={e => {
                      setLocationLabel(e.target.value)
                    }}
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
                    value={locationLabel}
                  />{" "}
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
              </>
              <label style={{ marginTop: "13px " }}>Contact Number</label>
              <Input
                placeholder="Contact Number"
                id="phone_number"
                defaultValue={data?.phone_number}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {errors.phone_number && (
                <div className="text-red-500">{errors.phone_number}</div>
              )}

              <label style={{ marginTop: "10px " }}>Fax Number</label>
              <Input
                placeholder="Fax Number"
                id="fax_number"
                defaultValue={data?.fax_number}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />

              {errors.fax_number && (
                <div className="text-red-500">{errors.fax_number}</div>
              )}

              <div className="float-right">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                    CloseModal
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
