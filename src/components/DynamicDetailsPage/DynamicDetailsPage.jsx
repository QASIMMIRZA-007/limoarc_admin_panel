import React, { useState } from "react"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
// import "./popupmodal.css"
import Booking_rides from "../../components/Booking_Rides/Booking_rides"
import ChaufferDetailsModal from "UI/ChaufferDetailsModel/ChaufferDetailsModal"
import CustomDetailsModal from "UI/CustomerDetailsModal/CustomerDetailsModal"
import { useLocation } from "react-router-dom"
const DynamicDetailsPage = (props) => {
  const [modal, setModal] = useState(false)
  const [activeTab, setActiveTab] = useState("userDetails")
const location = useLocation();
const item = location.state.item;
console.log("item",item)
  const toggle = () => setModal(!modal)

  const renderContent = () => {
    if (props.showBookingDetails) {
      return <Booking_rides item={props.item} />
    }

    if (props.isChauffuerDetails) {
      return (
        <>
          <ChaufferDetailsModal />

        </>
      )
    }

    return <CustomDetailsModal item={props.editData} />
  }

  return (
    <div>
      {/* <Button color="" onClick={toggle}>
        {props.buttonLabel}
      </Button> */}
      <div
        // isOpen={modal}
        // toggle={toggle}
        // className={props.className}
        // size="lg"
        // style={{ maxWidth: "700px", width: "100%" }}
      >
        <h1 > Details</h1>
        {/* <ModalHeader toggle={toggle}> Details</ModalHeader> */}
        {/* {renderContent()} */}
      </div>
    </div>
  )
}

export default DynamicDetailsPage


