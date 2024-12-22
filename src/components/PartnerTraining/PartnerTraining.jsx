import React from "react";
import "./partnerTraining.scss";
import TrainingModulesTable from "../../UI/TableModule/TrainingModulesTable";
import GetStartedButton from "../../UI/GetStartedButton/GetStartedButton";
const PartnerTraining = () => {
  return (
    <div className="partnerTrainingWrapper">
      <div className="partnerTrainingWrapp">
        <h2>Partner Training</h2>
        <p>
          Welcome to LimoArc! To start performing rides with us, please complete
          the following nine modules. You can access each module individually
          using the links below - You have completed out of 9 modules
        </p>
        <TrainingModulesTable />
        {/* <div className="btnsWrapp">
          <GetStartedButton isNext={false} title="Previous" />
          <GetStartedButton isNext={true} title="Next" />
        </div> */}
      </div>
    </div>
  );
};

export default PartnerTraining;
