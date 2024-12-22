import React, { useState } from "react"
import "./medical.css"
import { useParams } from "react-router";
import ChaufferDetailsModal from "UI/ChaufferDetailsModel/ChaufferDetailsModal"
const MedicalConditionScreen = () => {
  const { id } = useParams()
  console.log("ididid", id)


  return (
    <React.Fragment>
      <div className="page-content">
        <ChaufferDetailsModal chauffeurId={id} />
      </div>
    </React.Fragment>
  )
}

export default MedicalConditionScreen
