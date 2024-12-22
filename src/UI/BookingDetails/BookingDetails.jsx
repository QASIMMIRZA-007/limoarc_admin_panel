import React from "react"
import "./BookingDetails.scss"

const BookingDetails = ({ item }) => {
  console.log("item ", item)
  return (
    <div className="booking-details">
      <h2>Booking Details</h2>

      <div className="details-row">
        <span>Customer Name</span>
        <p>{item?.customerName || "Jhonny "}</p>
      </div>
      <div className="details-row">
        <span>Booking type</span>
        <p>{item?.vehicleType || "SUV"}</p>
      </div>
      <div className="details-row">
        <span>Status</span>
        <p className={item?.status === "Missed" ? "status-missed" : ""}>
          {item?.bookingStatus || "Missed"}
        </p>
      </div>
      <div className="details-row">
        <span>Booking date</span>
        <p>{item?.schedule || "26-09-2024"}</p>
      </div>
      <div className="details-row">
        <span>Paid amount</span>
        <p>{item?.paidAmount ? `$${item.paidAmount}` : "$420.4"}</p>
      </div>
    </div>
  )
}

export default BookingDetails
