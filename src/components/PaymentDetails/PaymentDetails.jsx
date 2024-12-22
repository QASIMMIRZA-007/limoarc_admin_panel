import React from "react";
import "./paymentDetails.scss";
import FlexLayout from "../../UI/FlexLayout/FlexLayout";
import { flexLayout_data_7 } from "../../Constants";
const PaymentDetails = () => {
  return (
    <div className="paymentdetailsWrapper">
      <div className="paymentdetailsWrapp">
        <h2>Payment Details</h2>
        <p>
          Please provide your bank details for receiving future payments from
          LimoArc.
        </p>
        <FlexLayout inputs={flexLayout_data_7} />
      </div>
    </div>
  );
};

export default PaymentDetails;
