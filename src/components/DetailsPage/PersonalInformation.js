import React from "react"
import "../../pages/DetailPage/DetailPage.css"
import UserProfile from "../../assets/userProfile.svg"

const PersonalInformation = ({ bookingDetail }) => {
  console.log("data in personal information", bookingDetail)

  return (
    <>
      <div className="personal-info">
        <div className="image-cont">
          <img
            src={
              bookingDetail?.personal_info?.user_id?.profile_image ||
              UserProfile
            }
            className="profile-image-user"
          />
        </div>
        <div className="name-sec sm:w-[40%]">
          <div className="md:flex flex   ">
            <h3 className="questionss">Full Name:</h3>
            <p className="answer">
              {bookingDetail?.personal_info?.user_id?.first_name}{" "}
              {bookingDetail?.personal_info?.user_id?.last_name}{" "}
            </p>
          </div>
          <div className="md:flex flex    ">
            <h3 className="questionss">Email Address:</h3>
            <p className="answer">
              {bookingDetail?.personal_info?.user_id?.email}
            </p>
          </div>
          <div className="md:flex flex  ">
            <h3 className="questionss">Gender:</h3>
            <p className="answer">{bookingDetail?.personal_info?.gender}</p>
          </div>

          <div className="md:flex flex   ">
            <h3 className="questionss ">Geo Location:</h3>
            <p className="answer ">
              {bookingDetail?.personal_info?.location?.address
                ? bookingDetail?.personal_info?.location?.address
                : "---"}
            </p>
          </div>
          <div className="md:flex flex   ">
            <h3 className="questionss ">Reachedable Address:</h3>
            <p className="answer ">
              {bookingDetail?.personal_info?.japan_email
                ? bookingDetail?.personal_info?.japan_email
                : "---"}
            </p>
          </div>
        </div>
        <div className="name-sec">
          <div className="flex    ">
            <h3 className="questionss">Phone Number:</h3>
            <p className="answer">
              {bookingDetail?.personal_info?.phone_number}
            </p>
          </div>
          <div className="md:flex flex  ">
            <h3 className="questionss">Date of birth:</h3>
            <p className="answer">
              {bookingDetail?.personal_info?.user_id?.dob}
            </p>
          </div>

          {/* <div className="flex  md:pt-[10px] ">
                <h3 className="question">Medical issues:</h3>
                <p className="answer"></p>
              </div> */}
        </div>
      </div>
    </>
  )
}

export default PersonalInformation
