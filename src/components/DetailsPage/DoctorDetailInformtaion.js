import React from "react"
import UserProfile from "../../assets/userProfile.svg"

import "../../pages/DetailPage/DetailPage.css"

const DoctorDetailsInformation = ({ bookingDetail }) => {
  console.log("doctor details in doc section =>", bookingDetail)
  const complaint_status =
    !bookingDetail?.doctor_id?.email &&
    bookingDetail?.booking_status == "Complaint" &&
    bookingDetail.payment_status == true

  return (
    <>
      <div className="personal-info">
        {complaint_status ? (
          <p style={complaint_status ? { color: "red" } : {}}>
            The call was unanswered by the doctors, resulting in the patient
            terminating the consultation prematurely.
          </p>
        ) : bookingDetail?.doctor_id?.email ? (
          <>
            {" "}
            <div className="image-cont">
              <img
                src={bookingDetail?.doctor_id?.profile_image || UserProfile}
                className="profile-image-user"
              />
            </div>
            <div className="name-sec sm:w-[35%]">
              <div className="md:flex flex">
                <h3 className="questionss">Full Name:</h3>
                <p className="answer">
                  {bookingDetail?.doctor_id?.first_name}{" "}
                  {bookingDetail?.doctor_id?.last_name}{" "}
                </p>
              </div>
              <div className="md:flex flex ">
                <h3 className="questionss">Email Address:</h3>
                <p className="answer">{bookingDetail?.doctor_id?.email}</p>
              </div>

              {/* <div className="md:flex md:justify-between flex md:pt-[10px] md:gap-3">
                <h3 className="question">Date of birth:</h3>
                <p className="answer">{bookingDetail?.doctor_id?.dob}</p>
              </div> */}
              {/* <div className="flex md:pt-[10px] md:gap-3 ">
                <h3 className="question ">Email:</h3>
                <p className="answer">{bookingDetail?.doctor_id?.email} </p>
              </div> */}
              <div className="name-sec">
                <div className="md:flex flex   ">
                  <h3 className="questionss">Phone Number:</h3>
                  <p className="answer">
                    {bookingDetail?.doctor_id?.phone_number}
                  </p>
                </div>
              </div>
              <div className="name-sec">
                <div className="flex md:flex w-[100%] mb-[8px]">
                  <h3 className="questionss ">Speciality:</h3>
                  {bookingDetail?.doctor_id?.deseases?.map(data => (
                    <p className="answer">{data?.desease_name}, </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p
            style={{ textAlign: "center", width: "100%" }}
            className="text-slate-400	 font-medium"
          >
            Doctor has not joined yet!
          </p>
        )}
      </div>
    </>
  )
}

export default DoctorDetailsInformation
