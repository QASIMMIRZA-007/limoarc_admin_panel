import React from "react"
import "./Attention.scss"

import { Card, CardText, CardTitle } from "reactstrap"

const Attention = ({ data }) => {
  return (
    <>
      <div className="md:pr-[25px] mt-[10px] attention-main-container">
        <h4 className="card-title mb-4">Additional Stats</h4>
        <div className=" d-flex flex-col md:flex-row align-items-center gap-[40px]">
          <Card
            body
            className="my-2"
            style={{
              width: "18rem",
            }}
          >
            <div className=" d-flex align-items-center justify-between">
              <CardTitle tag="h5" className="complaint-count-heading">
                Complaint Count
              </CardTitle>
              <h1>{data?.complaintCount}</h1>
            </div>
            <CardText>
              Total count of rides in complaint status this month
            </CardText>
          </Card>
          <Card
            body
            className="my-2"
            style={{
              width: "18rem",
            }}
          >
            <div className=" d-flex align-items-center justify-between">
              <CardTitle tag="h5" className="refunded-count-heading">
                Refunded rides
              </CardTitle>
              <h1>{data?.refundedConsultations}</h1>{" "}
            </div>
            <CardText>
              Total count of rides that were refunded this month
            </CardText>
          </Card>
          <Card
            body
            className="my-2"
            style={{
              width: "18rem",
            }}
          >
            <div className=" d-flex align-items-center justify-between">
              <CardTitle tag="h5" className="under-review-count-heading">
                Under Review rides
              </CardTitle>
              <h1>{data?.underReviewConsultations}</h1>{" "}
            </div>
            <CardText>
              Total count of rides currently under review for this month
            </CardText>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Attention
