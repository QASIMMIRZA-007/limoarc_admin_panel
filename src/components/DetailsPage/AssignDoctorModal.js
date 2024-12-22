import React from "react"
import { useState } from "react"
import ProfileIcon from "../../assets/userProfile.svg"
import { Modal, ModalHeader } from "reactstrap"
import { ApiCall } from "Services/apis"
import { useDispatch, useSelector } from "react-redux"
import { setLoader } from "Redux/Actions/GeneralActions"
import { useEffect } from "react"
import "./AssignDoctorModal.scss"

const AssignDoctorModal = ({ isOpen, toggle, bookingDetail }) => {
  const [doctors, setDoctors] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const token = useSelector(state => state.auth.adminToken)
  const dispatch = useDispatch()

  const addUser = userId => {
    setSelectedUser(userId)
  }

  const removeUser = () => {
    setSelectedUser(null)
  }

  console.log(bookingDetail, "booking details")

  const getAllDoctors = async () => {
    try {
      const res = await ApiCall({
        route: "doctor/all_doctors",
        token: token,
        verb: "get",
      })

      if (res?.status === 200) {
        setDoctors(
          res?.response?.list?.filter(
            el =>
              //   (el?.type === "both" || el?.type === "urgent_care") &&
              //   el?.doctor_status
              true
          )
        )
        dispatch(setLoader(false))
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    getAllDoctors()
  }, [])

  const onAssignDoctor = async () => {
    try {
      const res = await ApiCall({
        route: `booking/assign_doctor_in_booking/${bookingDetail?._id}`,
        token: token,
        verb: "put",
        params: { doctor_id: selectedUser },
      })

      if (res?.status === 200) {
        toggle()
        window.location.reload()
        dispatch(setLoader(false))
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="lg"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      <ModalHeader toggle={toggle}>Assign Doctor</ModalHeader>
      <div className="assign-doctor-main-container">
        <div className="assign-doctor-container">
          {doctors.map((el, index) => (
            <div key={el?._id} className="group-member-container">
              <div className="single-inner-left">
                <img
                  src={el?.profile_image || ProfileIcon}
                  alt={`Profile of ${el?.first_name} ${el?.last_name}`}
                />
                <div>
                  <h5>{`${el?.first_name} ${el?.last_name}`}</h5>
                  <p>{"Doctor"}</p>
                </div>
              </div>
              {!selectedUser ? (
                <button
                  className="add-button"
                  onClick={() => addUser(el?.user_id?._id)}
                >
                  Assign
                </button>
              ) : (
                selectedUser === el?.user_id?._id && (
                  <button
                    className="remove-button"
                    onClick={() => removeUser()}
                  >
                    Unassign
                  </button>
                )
              )}
            </div>
          ))}
        </div>
        <button className="save-assign-button" onClick={onAssignDoctor}>
          Save
        </button>
      </div>
    </Modal>
  )
}

export default AssignDoctorModal
