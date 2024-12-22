import React from "react";
import "./summary.scss";
const Summary = () => {
  return (
    <div className="summaryWrapper">
      <div className="summaryWrapp">
        <h2>Partner Onboarding Summary</h2>
        <ul>
          <li>Application Status: In Progress</li>
          <li>Training: Incomplete</li>
          <li>Documents: 0 out of 15 documents uploaded</li>
          <li>Contract Signed: Yes</li>
          <li>Payment Details Submitted: Submitted</li>
        </ul>
        <p>
          Your application can only be submitted for review if the above-stated
          information is complete. Please ensure you have completed all the
          steps listed above before submitting your application for review. For
          more information, you can visit our FAQ page.
        </p>
      </div>
    </div>
  );
};

export default Summary;
