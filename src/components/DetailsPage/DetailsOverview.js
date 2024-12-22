import "../../pages/DetailPage/DetailPage.css"
import Box from "@mui/material/Box"
// import { Box } from "@mui/material";
import Stepper from "@mui/material/Stepper"

import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
// import {  useNavigate } from "react-router";
import { differenceInMinutes, formatDistance } from "date-fns"
import { ApiCall } from "../../Services/apis"
import { setLoader } from "Redux/Actions/GeneralActions"
import AssignDoctorModal from "./AssignDoctorModal"

const DetailsOverview = ({ bookingDetail, markBookingAsPaid }) => {
  const token = useSelector(state => state.auth.doctorToken)
  const user = useSelector(state => state.auth.doctorData)
  const { id } = useParams()
  console.log("id", id)
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  const [inPresonStepActive, setInPersonStepActive] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [bookingType, setBookingType] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  console.log("Overview", bookingDetail)
  // console.log("Overview2",activeStep)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const steps = [
    {
      label: "Request Recieved",
      description: ``,
    },
    {
      label: "Patient booking & payment",
      description: "",
    },
    {
      label: "Video call with patient",
      description: ``,
    },

    {
      label: "Reviews Recieved",
      description: ``,
    },
    {
      label: "Prescription sent to pharmacy",
      description: ``,
    },
    {
      label: "Completed",
      description: ``,
    },
  ]
  const inPersonSteps = [
    {
      label: "Request Sent",
      description: ``,
    },
    {
      label: "Booking Comfirmed",
      description: "",
    },
    {
      label: "In-Person Visit",
      description: `
                  `,
    },
    {
      label: "Reviews Sent ",
      description: `
                    `,
    },
    {
      label: "Prescription Recieved",
      description: `
                    `,
    },
    {
      label: "Completed",
      description: `
                    `,
    },
  ]
  const CheckBookingStatus = () => {
    if (bookingDetail?.booking_type === "visit") {
      setBookingType(true)
      return
    }
  }
  useEffect(() => {
    CheckBookingStatus()
  }, [bookingDetail])

  const cancelledStatus = bookingDetail?.booking_status == "re_assign"

  const complaint_status =
    (!bookingDetail?.doctor_id?.email &&
      bookingDetail?.booking_status == "Complaint" &&
      bookingDetail.payment_status == true) ||
    cancelledStatus

  const onlyComplaintStaus = bookingDetail?.booking_status == "Complaint"

  useEffect(() => {
    console.log(activeStep)
    if (bookingDetail?.consultation_status === "none") {
      // console.log("Request is received");
      setActiveStep(1)
    } else if (
      bookingDetail?.consultation_status === "upcoming" ||
      complaint_status
    ) {
      // console.log("Payment is Done");
      setActiveStep(2)
    } else if (
      bookingDetail?.consultation_status === "on_going" ||
      complaint_status
    ) {
      // console.log("Video call is on going");
      setActiveStep(3)
    } else if (
      bookingDetail?.consultation_status === "under_review" &&
      !complaint_status
    ) {
      // console.log("Review received!");
      setActiveStep(4)
    } else if (
      bookingDetail?.consultation_status === "medicine_send" &&
      !complaint_status
    ) {
      // console.log("Medicine send to patient");
      setActiveStep(5)
    } else if (
      bookingDetail?.consultation_status === "prescription_send" &&
      !complaint_status
    ) {
      // console.log("Prescription send to pharmacy!");
      setActiveStep(6)
    } else if (
      bookingDetail?.consultation_status === "completed" &&
      !complaint_status
    ) {
      // console.log("Prescription send to pharmacy!");
      setActiveStep(7)
    } else {
      // console.log("Overview is not compeleted!");
    }
  }, [bookingDetail])

  useEffect(() => {
    if (bookingDetail?.consultation_status === "none") {
      setInPersonStepActive(1)
      // setDisabledVedio(false);
    } else if (bookingDetail?.consultation_status === "upcoming") {
      setInPersonStepActive(2)
      // setDisableReview(true);
    } else if (bookingDetail?.consultation_status === "on_going") {
      setInPersonStepActive(3)
    } else if (bookingDetail?.consultation_status === "under_review") {
      setInPersonStepActive(4)
      // setDisabledVedio(true);
    } else if (bookingDetail?.consultation_status === "medicine_send") {
      setInPersonStepActive(5)
    } else if (bookingDetail?.consultation_status === "prescription_send") {
      setInPersonStepActive(6)
    } else if (bookingDetail?.consultation_status === "completed") {
      setInPersonStepActive(7)
    } else {
      console.log("Overview is not compeleted!")
    }
  }, [bookingDetail])

  return (
    <>
      <div className="bottom-card-section w-[100%]">
        <div className="steppers-container w-[100%]">
          <h3 className="headings">Overview</h3>
          {bookingType ? (
            <Box sx={{ maxWidth: 400, marginLeft: 4 }}>
              <Stepper activeStep={inPresonStepActive} orientation="vertical">
                {inPersonSteps.map(step => (
                  <Step expanded={true} key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <p className="stepper-desc">{step.description}</p>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          ) : (
            <Box sx={{ maxWidth: 400, marginLeft: 4 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step expanded={true} key={step.label}>
                    <StepLabel>
                      <span
                        style={
                          index == 2 && complaint_status ? { color: "red" } : {}
                        }
                      >
                        {step.label}
                      </span>
                    </StepLabel>
                    <StepContent>
                      {index == 0 && bookingDetail?.payment_status == false && (
                        <>
                          <p>Currenly booking is unpaid.</p>
                          <button
                            className="save-assign-button"
                            onClick={markBookingAsPaid}
                          >
                            Mark booking as paid
                          </button>
                        </>
                      )}
                      {index == 2 && complaint_status && (
                        <label>Patient Message:</label>
                      )}
                      <p
                        className={"stepper-desc"}
                        style={
                          index == 2 && complaint_status ? { color: "red" } : {}
                        }
                      >
                        {index == 2 && complaint_status && onlyComplaintStaus
                          ? `${bookingDetail?.complaint_message}` ||
                            "The call was unanswered by the doctors, resulting in the patient terminating the consultation prematurely."
                          : step.description}
                      </p>
                      {index == 2 && complaint_status && onlyComplaintStaus && (
                        <label>Patient Availability:</label>
                      )}
                      {index == 2 && complaint_status && onlyComplaintStaus && (
                        <p
                          className={"stepper-desc"}
                          style={
                            index == 2 && complaint_status
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {`${bookingDetail?.patient_availablity}`}
                        </p>
                      )}
                      {index == 2 && complaint_status && (
                        <button onClick={toggle} className="save-assign-button">
                          Assign Doctor
                        </button>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}
        </div>
      </div>
      <AssignDoctorModal
        bookingDetail={bookingDetail}
        toggle={toggle}
        isOpen={isOpen}
      />
      <div className="d-none" style={{ margin: "20px", height: "20px" }}></div>
    </>
  )
}

export default DetailsOverview
