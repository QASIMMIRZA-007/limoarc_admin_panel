import React, { useState } from "react"
import "./Booking_rides.scss"
import { ArrowBack } from "@mui/icons-material"
import { Flex, Rate, Tabs } from "antd"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import { CiDollar, CiLocationOn, CiUser } from "react-icons/ci"
import { MdDataUsage, MdOutlineMailOutline } from "react-icons/md"
import { IoCallOutline } from "react-icons/io5"
import { BsBriefcase } from "react-icons/bs"
import { HiMiniArrowLongLeft } from "react-icons/hi2"
import { ReactSVG } from "react-svg"
import { useLocation, useParams } from "react-router-dom"
// import { APIProvider } from "@vis.gl/react-google-maps";
import { all } from "axios"
import { useSelector } from "react-redux"
import Custom_details_comp from "components/Custom_details_comp/Custom_details_comp"
// import MapComponent from "components/MapComponent/MapComponent"

import { SlCalender } from "react-icons/sl"

import "./styles.scss"
import { map } from "assets/IndexSvgs"
import { FaMap } from "react-icons/fa"
const Booking_rides = () => {
  const location = useLocation()
  const { id } = useParams()
  const allRides = location.state?.booking
  const navigate = useHistory()
  console.log("naya pakistan ", location.state?.customer)

  const [rideDetails, setRideDetails] = useState(null)
  const user = useSelector(state => state.auth.adminData)
  console.log("allrides ff ff  f", allRides)
  const updatedAt = allRides?.updatedAt
  const date = new Date(updatedAt)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
  const extractDate = new Date(allRides?.startDate)
  const formattedStartDate = extractDate.toLocaleDateString()
  console.log("Formatted Time:", formattedStartDate)
  const booking_container_details = [
    { id: 1, first_text: "Booking type", sec_text: allRides?.bookingType },
    {
      id: 2,
      first_text: "Status",
      sec_text: (
        <span
          style={{
            color: allRides?.status === "pending" ? "#F7CB73 " : "#33d533",
          }}
        >
          {" "}
          {allRides?.status}
        </span>
      ),
    },
    { id: 3, first_text: "Booking date", sec_text: formattedStartDate },
    { id: 4, first_text: "Booking time ", sec_text: formattedTime },
  ]

  const navigateBack = () => {
    navigate.push(-1)
  }

  const onChange = key => {
    console.log(key)
  }
  const route = [
    [40.7128, -74.006], // Downtown NYC coords
    [40.6413, -73.7781], // JFK coords
  ]
  const summarydata = [
    {
      id: 1,
      first_text: "From:",
      fist_icon: <CiLocationOn style={{ fontSize: "18px" }} />,
      sec_text: "Downtown, NYC",
    },
    {
      id: 2,
      first_text: "To:",
      fist_icon: <CiLocationOn style={{ fontSize: "18px" }} />,
      sec_text: "JFK, New York",
    },
    {
      id: 3,
      first_text: "Booking Type:",
      fist_icon: <SlCalender style={{ fontSize: "18px" }} />,
      sec_text: " Airport",
    },
    {
      id: 4,
      first_text: "Price: ",
      fist_icon: <CiDollar style={{ fontSize: "18px" }} />,
      sec_text: "$45.00",
    },
  ]
  const bookingdetailsData = [
    {
      id: 1,
      first_text: "Date: ",
      fist_icon: "",
      sec_text: "22 Dec 2024",
    },
    {
      id: 2,
      first_text: "Time: ",
      fist_icon: "",
      sec_text: " 3:00 PM - 4:15 PM",
    },
    {
      id: 3,
      first_text: "Chauffeur: ",
      fist_icon: "",
      sec_text: "John Doe",
    },
    {
      id: 4,
      first_text: "Contact:  ",
      fist_icon: "",
      sec_text: "+1 234 567 89",
    },
  ]
  const timelineDetails = [
    {
      label: "Ride Accepted:",
      timestamp: "22 Dec 2024, 2:45 PM",
    },
    {
      label: "Journey Started to Pickup:",
      timestamp: "22 Dec 2024, 2:55 PM",
    },
    {
      label: "Reached Pickup Location:",
      timestamp: "22 Dec 2024, 3:10 PM",
    },
    {
      label: "Customer Attended:",
      timestamp: "22 Dec 2024, 3:15 PM",
    },
    {
      label: "Ride Started:",
      timestamp: "22 Dec 2024, 3:20 PM",
    },
    {
      label: "Ride Completed:",
      timestamp: "22 Dec 2024, 4:15 PM",
    },
  ]

  return (
    <div className="bookingWrapper">
      {/* <div className="bookingWrapp">
        <div className="booking_header">
          <div className="booking_header_row">
            <div className="flex">
              <HiMiniArrowLongLeft onClick={navigateBack} />
              <span>Ride Bookings</span>
            </div>
            <div
              className={`${
                allRides?.status === "pending" ? "yellowBadge" : ""
              }badge`}
            >
              {allRides?.status}
            </div>
          </div>
          <h3>Ride Booking</h3>
          {console.log("allRides", formattedStartDate)}
          <p>{formattedStartDate + " at " + formattedTime}</p>
          {allRides?.status === "approved" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginTop: "-30px",
              }}
            ></div>
          )}
        </div>
        <div className="booking_container_header">
          <div className="booking_container">
            <h3>Booking details</h3>
            <div className="booking_container_details_wrapp">
              {booking_container_details.map(item => (
                <div key={item.id} className="booking_container_details">
                  <p>{item.first_text}</p>
                  <p>{item.sec_text}</p>
                </div>
              ))}
            </div>
            <div className="paid_amount">
              <p>Paid amount</p>
              <p>${allRides?.price}</p>
            </div>
          </div>
          <div className="imageWrapper">
            {" "}
        <APIProvider
            apiKey="AIzaSyAsFOFVKFnQQPiDWyi8hrenBVpbgikm32Q"
            onLoad={() => console.log("Maps API has loaded.")}
          >
            {console.log('dfsfs',allRides)}
            <MapComponent
              height="200px"
              lat={allRides?.startLocation.lat}
              lng={allRides?.startLocation?.lng}
              lat2={allRides?.endLocation?.lat}
              lng2={allRides?.endLocation?.lng}
              // lat={30.15928389999999}
              // lng={72.694262}
              // lat2={30.0441544}
              // lng2={72.34406849999999}
            />
          </APIProvider> 
          </div>
        </div>
        {allRides?.feedback?.comments && (
          <div className="feedback_container">
            <div className="feedback_heading">
              <h3>Feedback</h3>
              <div className="flex">
                <Rate count={4} /> 4/5
              </div>
            </div>
            <p>{allRides?.feedback?.comments}</p>
          </div>
        )}
        <div className="custom_details_comp_wrapper">
          <Custom_details_comp
            person_name={user?.firstName + " " + user?.lastName}
            details_title="Customer Details"
            showVehicleDetails={false}
            showUserDetails={true}
            isCustomerData={true}
            dataType="customer"
            customerData={location.state?.customer?.customer}
            allRides={allRides}
          />

          <Custom_details_comp
            person_name="Jhon Deo"
            details_title="Vehicle Details"
            showVehicleDetails={true}
            showUserDetails={false}
            isCustomerData={false}
            dataType="ride"
            allRides={allRides}
          />
        </div>
      </div> */}
      <div className="container">
        <div className="map">
          {/* <MapContainer center={[40.7128, -74.006]} zoom={12}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={route} color="blue" />
        </MapContainer> */}
          <img src={map} />
        </div>

        <div className="panel">
          <header className="header">
            <div>
              <h3>Ride Booking Details</h3>
              <span className="id">Ride ID: #15145</span>
            </div>
            <button className="btn">On the way</button>
          </header>

          <section className="summary">
            <h3>Ride Summary</h3>
            <div className="route">
              {summarydata.slice(0, 2).map(item => (
                <div className="point" key={item.id}>
                  <Flex gap={4} align="center">
                    {item.fist_icon}
                    <span>{item.first_text}</span>
                  </Flex>
                  {item.sec_text}
                </div>
              ))}
            </div>
            <div className="route">
              {summarydata.slice(2, 4).map(item => (
                <div className="point" key={item.id}>
                  <Flex gap={4} align="center">
                    {item.fist_icon}
                    <span>{item.first_text}</span>
                  </Flex>
                  {item.sec_text}
                </div>
              ))}
            </div>
          </section>
          <section className="summary">
            <h3>Booking Details</h3>
            <div className="route">
              {bookingdetailsData.slice(0, 2).map(item => (
                <div className="point" key={item.id}>
                  <Flex gap={4} align="center">
                    {item.fist_icon}
                    <span>{item.first_text}</span>
                  </Flex>
                  {item.sec_text}
                </div>
              ))}
            </div>
            <div className="route">
              {bookingdetailsData.slice(2, 4).map(item => (
                <div className="point" key={item.id}>
                  <Flex gap={4} align="center">
                    {item.fist_icon}
                    <span>{item.first_text}</span>
                  </Flex>
                  {item.sec_text}
                </div>
              ))}
            </div>
          </section>

          <section className="timeline">
            <h3>Ride Timeline</h3>
            {timelineDetails.map((detail, index) => (
              <div key={index} className="event">
                <span className="status_">{detail.label}</span>
                <span className="time">{detail.timestamp}</span>
              </div>
            ))}
          </section>

          <section className="feedback">
            <h3>Customer Feedback</h3>
           <Rate count={5} defaultValue={4} allowHalf disabled />
            <p className="review">"Great ride, very professional driver!"</p>
          </section>
          <section className="feedback">
            <h3>Chauffeur Feedback</h3>
           <Rate count={5} defaultValue={4} allowHalf disabled />
            <p className="review">"Great ride, very professional driver!"</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Booking_rides
