import React, { useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { ApiCall } from "../../Services/apis"
import "../../pages/DetailPage/DetailPage.css"
// import { setLoader } from "../../Redux/Actions/GenralActions";
import { setLoader } from "Redux/Actions/GeneralActions"

const ReView = ({ bookingDetail }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.userToken)
  // console.log("reviews in api =>", bookingDetail);
  // console.log(bookingDetail?.review?.rating);
  const sendReviewRequest = async () => {
    try {
      dispatch(setLoader(true))
      const res = await ApiCall({
        route: `review/send_review_request/${id}`,
        verb: "post",
        token: token,
      })
      if (res?.status == "200") {
        Swal.fire({
          title: "Send request for review",
          text: "by doctor",
          timer: 1500,
          showConfirmButton: false,
        })
        console.log("pharmacy =>", res?.response)
        dispatch(setLoader(false))
      } else {
        console.log("error", res.response)
        Swal.fire({
          title: "Not send request for review",
          text: "error",
          timer: 1500,
          showConfirmButton: false,
        })
        dispatch(setLoader(false))
      }
    } catch (e) {
      dispatch(setLoader(false))

      console.log("saga login error -- ", e.toString())
    }
  }

  return (
    <div className="review-card">
      <div>
        <h3 className="headings">What patient say about doctor.</h3>

        <div className="flex flex-col">
          <div className="bottom-review-card">
            {/* <div className='bottom-review-card'>

                </div> */}
            {bookingDetail?.review?.comment == null ? (
              <>
                <p className="pb-[10px] font-semibold">No Reviews yet !</p>
                {/* <span onClick={sendReviewRequest} className="request-button">
                  <p>Request Reviews </p>
                </span> */}
              </>
            ) : (
              <>
                <Rating value={bookingDetail?.review?.rating} readOnly />
                <h4 className="text-[14px] mt-[5px] max-w-[80vw] ">
                  {bookingDetail?.review?.comment}
                </h4>
                <p>
                  <span className="font-bold text-orange-600 pr-[10px]">
                    By:
                  </span>
                  {bookingDetail?.personal_info?.user_id?.first_name} {""}{" "}
                  {bookingDetail?.personal_info?.user_id?.last_name}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReView
