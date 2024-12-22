import React from "react"
import "./ClientDetails.scss"
import dummyUserImage from "../../assets/projectSvgs/dummyUser.png"
import { FaUserCheck, FaUserTie } from "react-icons/fa"
import { ReactSVG } from "react-svg"

const CustomDetailsModal = ({
  item,
  details_title,
  isChauffer = false,
  customerData,
  chauffeurData,
  isCustomer,
}) => {
  const customer = customerData
  // const chauffeur = chauffeurData
  console.log("chauffeurData in position", customer?.address?.city);

  const clientDetails = [
    { label: "Booking Id", value: customer?._id || "N/A" },
    { label: "Gender", value: customer?.title === "Mr" ? "Male" : "Female" },
    { label: "Payment status", value: <span style={{ color: customer?.paymentStatus === "received" ? "green" : "red" || customer?.status === "pending" ? "red" : "green" }}> {customer?.paymentStatus || customer?.status } </span> || "N/A" },
    { label: "Contact No.", value: customer?.phone || "N/A" },
    { label: "Email Address", value: customer?.email || "N/A" },
    {
      label: "Location",
      value:
        customer?.address?.city + " " + customer?.address?.state + " " + customer?.address?.country ||
        "N/A",
    },
  ]



  return (
    <div className="client-details">
      <h2>{details_title}</h2>
      <div className="client-info">
        <div className="client-header">
   <img
  src={
    isCustomer
      ? customer?.profilePicture
        ? customer.profilePicture
        : "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?semt=ais_hybrid"
      : customer?.profilePicture
      ? customer.profilePicture
      : "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?semt=ais_hybrid"
  }
  alt="Client"
  className="client-image"
/>

  



          <div>
            <h3>
              {customer?.firstName && customer?.lastName
                ? `${customer.firstName} ${customer.lastName}`
                : customer?.first_name && customer?.last_name
                ? `${customer.first_name} ${customer.last_name}`
                : "Jhonny"}
            </h3>
            <p className="client-about">
              I’m specialized in consistent exercise routines and proper
              nutrition.
            </p>
          </div>
        </div>
        <div className="client-details-body">
          {clientDetails ?.map(
            (detail, index) => (
              <div className="client-detail" key={index}>
                <span>{detail.label}</span>
                <p>{detail.value}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomDetailsModal
