

import React, { useState } from "react"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import BookingDetails from "UI/BookingDetails/BookingDetails"
import "./popupmodal.css"
import Booking_rides from "../../components/Booking_Rides/Booking_rides"
import ChaufferDetailsModal from "UI/ChaufferDetailsModel/ChaufferDetailsModal"

const EditModal = (props) => {
  const [modal, setModal] = useState(false)
  const [activeTab, setActiveTab] = useState("userDetails")

  const toggle = () => setModal(!modal)

  // const renderContent = () => {
  //   if (props.showBookingDetails) {
  //     return <Booking_rides />
  //   }

  //   if (props.isChauffuerDetails) {
  //     return (
  //       <>
  //         <ChaufferDetailsModal />

  //       </>
  //     )
  //   }

  //   return <CustomDetailsModal item={props.editData} />
  // }

  return (
    <div>
      <Button color="" onClick={toggle}>
        {props.buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={props.className}
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <ModalHeader toggle={toggle}> Details</ModalHeader>
        {/* {renderContent()} */}
      </Modal>
    </div>
  )
}

export default EditModal


