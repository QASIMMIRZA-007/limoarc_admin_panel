import React from "react"
import "./TrainingModulesTable.scss"

const modules = [
  { id: 1, name: "Welcome to Limoarc", percentage: "0%" },
  { id: 2, name: "Chauffeur App: The Basics", percentage: "0%" },
  { id: 3, name: "Chauffeur App: Managing Rides", percentage: "0%" },
  { id: 4, name: "Waiting Time Policy", percentage: "0%" },
  { id: 5, name: "Partner Portal", percentage: "0%" },
  { id: 6, name: "Chauffeur App: The Basics", percentage: "0%" },
  { id: 7, name: "Reviewing Rides", percentage: "0%" },
  {
    id: 8,
    name: "Guidelines: Quality Standard and Incentives",
    percentage: "0%",
  },
  { id: 9, name: "Safety Guidelines & Emergency Procedures", percentage: "0%" },
]

const TrainingModulesTable = () => {
  return (
    <div className="tableWrapper">
      <table className="trainingTable">
        <thead>
          <tr>
            <th>Module No</th>
            <th>Training Modules</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(module => (
            <tr style={{ borderRadius: "10px" }} key={module.id}>
              <td style={{ border: "1px solid #eee" }}>{module.id}</td>
              <td
                className="row-name"
                style={{
                  color: "#A18552",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "1px solid #eee",
                }}
              >
                {module.name}
              </td>
              <td style={{ textAlign: "end", border: "1px solid #eee" }}>
                {module.percentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrainingModulesTable
