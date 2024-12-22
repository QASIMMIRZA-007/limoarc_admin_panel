import React from "react"
import "../../pages/DetailPage/DetailPage.css"

const PrevMedicalHistory = ({ bookingDetail }) => {
  console.log("previous Medical history =>", bookingDetail)
  return (
    <>
      {bookingDetail?.medical_history?.booking_reason ? (
        <div className="medical-history-cont">
          <div className="med-middle-sec">
            <div className="med-headings">
              <h3>What brings you here today?</h3>
              {bookingDetail.medical_history.booking_reason == " " ? (
                <p>Not provided</p>
              ) : (
                <p className="pb-[10px] pr-[20px]">
                  {bookingDetail?.medical_history?.booking_reason}{" "}
                </p>
              )}
            </div>
            <div className="med-headings">
              <h3>Existing Allergies</h3>
              {bookingDetail.medical_history.allergy.length == 0 ? (
                <p>No Allergies </p>
              ) : (
                <ul className="flex pl-[0px] flex-wrap">
                  {bookingDetail.medical_history.allergy.map(data => (
                    <li className="m-[4px] pr-[12px]">{data + ","}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="med-middle-sec">
            <div className="med-headings">
              <h3>Existing Medications</h3>
              {bookingDetail.medical_history.medication == 0 ? (
                <p>No Medications Provided</p>
              ) : (
                <div className="medications-list">
                  {bookingDetail.medical_history.medication.map(data => (
                    <p className="">{data + ","}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {bookingDetail?.personal_info?.gender === "male" ? null : (
            <div className="med-middle-sec">
              <div className="med-headings">
                <h3>Pregnancy status</h3>
                <ul>
                  <li className="pb-[10px] w-[100%]">
                    {bookingDetail?.medical_history?.pregnancy_status}
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="med-middle-sec">
            <div className="med-headings">
              <h3>Past Medical History</h3>
              {bookingDetail.medical_history.past_history == null ? (
                <p>No Previous Medical Record</p>
              ) : (
                <p className="pb-[20px] w-[100%] pr-[20px]">
                  {bookingDetail?.medical_history?.past_history}{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="">
            <div className="flex justify-center items-center align-center w-[100%]">
              <p className="text-slate-400	 font-medium mt-[5%] mb-[5%]">
                Patient have not the provide medical history
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PrevMedicalHistory
