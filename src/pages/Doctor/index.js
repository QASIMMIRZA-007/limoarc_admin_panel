// import React, { useEffect, useState } from "react"
// import { MDBDataTable } from "mdbreact"
// import { Row, Col, Card, CardBody } from "reactstrap"
// import "./doctor.scss"
// import PopupModal from "common/data/PopupModal"
// import { useDispatch, useSelector } from "react-redux"
// import { ApiCall } from "Services/apis"
// import { setLoader } from "Redux/Actions/GeneralActions"
// import change_password from "assets/change-password.png"

// import Swal from "sweetalert2"
// import EditableIcon from "assets/fonts/EditableIcon"

// import DeleteIcon from "assets/fonts/DeleteIcon"
// import EditDoctorModal from "./EditDoctorModal"
// import { icon } from "leaflet"
// import "./doctor.css"
// import FileIcon from "assets/fonts/FileIcon"
// import DetailsDoctorModal from "./DetailsDoctorModal"
// import { style } from "@material-ui/system"
// import ChnagePasswordModal from "components/updatePassword/ChnagePasswordModal"

// const DoctorScreen = ({ drType }) => {
//   const ActionIcons = item => (
//     <div
//       style={{
//         display: "flex",
//         cursor: "pointer",
//         // justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div>
//         <select
//           value={item?.doctor_status == true ? "Active" : "Disable"}

//           onChange={e => {
//             deleteDoctor(item?.user_id?._id, e.target?.value)
//             // console.log("e.target?.value", e.target?.value)
//           }}
//         >
//           <option>Active</option>
//           <option>Disable</option>
//         </select>
//       </div>
//       <div>
//         <EditDoctorModal
//           buttonLabel={<EditableIcon />}
//           getAllDoctors={getAllDoctors}
//           editData={item}
//         />
//       </div>
//       <div>
//         <ChnagePasswordModal
//           buttonLabel={
//             <img
//               style={{ width: "20px", maxWidth: "20px" }}
//               src={change_password}
//             />
//           }
//           getAllDoctors={getAllDoctors}
//           editData={item}
//         />
//       </div>
//       <div>
//         <DetailsDoctorModal buttonLabel={<FileIcon />} editData={item} />
//       </div>
//       {/* <div onClick={() => deleteDoctor(item?.user_id)}>
//         <DeleteIcon />
//       </div> */}
//     </div>
//   )

//   const deleteDoctor = async (id, value) => {
//     console.log("firstID", id)
//     dispatch(setLoader(true))
//     const status = value == "Active" ? true : false

//     try {
//       const res = await ApiCall({
//         route: `doctor/doctor_status_update/${id}&${status}`,
//         token: token,
//         verb: "put",
//       })

//       if (res?.status === 200) {
//         {
//           status ? (
//             <>
//               {Swal.fire({
//                 title: "Doctor is Activited",
//                 text: "successfully",
//                 timer: 2000,
//                 showConfirmButton: false,
//               })}
//             </>
//           ) : (
//             <>
//               {Swal.fire({
//                 title: "Doctor is Disabled",
//                 text: "successfully",
//                 timer: 2000,
//                 showConfirmButton: false,
//               })}
//             </>
//           )
//         }

//         dispatch(setLoader(false))
//         getAllDoctors()
//       } else {
//         Swal.fire(`${res.response.message}`, "Try again", "error")
//         dispatch(setLoader(false))
//       }
//     } catch (e) {
//       console.log("saga login error -- ", e.toString())
//       dispatch(setLoader(false))
//     }
//   }

//   const token = useSelector(state => state.auth.adminToken)
//   const [data, setData] = useState([])
//   const dispatch = useDispatch()
//   const getAllDoctors = async () => {
//     try {
//       const res = await ApiCall({
//         route: "doctor/all_doctors",
//         token: token,
//         verb: "get",
//       })

//       if (res?.status === 200) {
//         setData({
//           columns: [
//             {
//               label: "First Name ",
//               field: "first_name",
//               sort: "asc",
//               width: 150,
//             },
//             {
//               label: "Last Name",
//               field: "last_name",
//               sort: "asc",
//               width: 270,
//             },
//             {
//               label: "Phone Number",
//               field: "phone_number",
//               sort: "asc",
//               width: 200,
//             },

//             {
//               label: "Consultation Type",
//               field: "type",
//               sort: "asc",
//               width: 100,
//             },
//             {
//               label: "Email",
//               field: "email",
//               sort: "asc",
//               width: 100,
//             },
//             {
//               label: "Qualification",
//               field: "qualification",
//               sort: "asc",
//               width: 100,
//             },
//             {
//               label: "Action",
//               field: "action",
//               sort: "asc",
//               width: 100,
//             },
//           ],
//           rows: res?.response?.list.map(items => {
//             console.log("Doctor---->", items)
//             const {
//               first_name,
//               last_name,
//               phone_number,
//               qualification,
//               type,
//               user_id,
//             } = items
//             // console.log("first_name",first_name)
//             // const speciality = deseases?.desease_name

//             // console.log("deseases", speciality)

//             return {
//               first_name,
//               last_name,
//               phone_number,
//               type,
//               qualification,
//               email: user_id?.email,
//               action: ActionIcons(items),
//             }
//           }),
//         })
//         // console.log("doctor-->", res?.response?.list)
//         dispatch(setLoader(false))
//       } else {
//         Swal.fire(`${res.response.message}`, "Try again", "error")
//         dispatch(setLoader(false))
//       }
//     } catch (e) {
//       console.log("saga login error -- ", e.toString())
//       dispatch(setLoader(false))
//     }
//   }
//   useEffect(() => {
//     dispatch(setLoader(true))
//     getAllDoctors()
//   }, [])

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <div className="container-fluid">
//           <div className="flex justify-between items-center">
//             <div className="w-[100%]">
//               <h2 className="page-title-dash">Doctors</h2>
//             </div>
//             <div className="w-[100%] flex justify-end  ">
//               {/* <Col md={3}> */}
//               <div className="">
//                 <PopupModal
//                   buttonLabel="Add Doctor"
//                   className="modal"
//                   headertitle="Regular doctor"
//                   role="regular"
//                   labelfirst="First Name"
//                   labelsec="Last Name"
//                   qualification="Qualification"
//                   drType="Add Doctor"
//                   getAllDoctors={getAllDoctors}
//                 />
//               </div>

//               {/* <div className="ml-[]">
//                 <PopupModal
//                   buttonLabel="Add Urgent Doctor"
//                   className="modal"
//                   headertitle="Add Urgent doctor"
//                   role="urgent_care"
//                   labelfirst="First Name"
//                   labelsec="Last Name"
//                   qualification="Qualification"
//                   drType="Add Urgent Doctor"
//                   getAllDoctors={getAllDoctors}
//                 />
//               </div> */}
//               {/* </Col> */}
//             </div>
//           </div>
//           {/* <Row> */}
//           <Col className="col-12 ">
//             <Card>
//               <CardBody>
//                 {/* <div className="">
//                     <Select
//                       className=""
//                       value={selectedGroup}
//                       onChange={() => {
//                         handleSelectGroup()
//                       }}
//                       options={optionGroup}
//                       placeholder="All"
//                     />
//                   </div> */}
//                 <MDBDataTable
//                   responsive
//                   bordered
//                   data={data}
//                   sortable={false}
//                 />
//               </CardBody>
//             </Card>
//           </Col>
//           {/* </Row> */}
//         </div>
//       </div>
//     </React.Fragment>
//   )
// }

// export default DoctorScreen




import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody } from "reactstrap"
import "./doctor.scss"
import PopupModal from "common/data/PopupModal"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "Services/apis"
import { setLoader } from "Redux/Actions/GeneralActions"
import change_password from "assets/change-password.png"

import Swal from "sweetalert2"
import EditableIcon from "assets/fonts/EditableIcon"

import DeleteIcon from "assets/fonts/DeleteIcon"
import EditDoctorModal from "./EditDoctorModal"
import { icon } from "leaflet"
import "./doctor.css"
import FileIcon from "assets/fonts/FileIcon"
import DetailsDoctorModal from "./DetailsDoctorModal"
import { style } from "@material-ui/system"
import ChnagePasswordModal from "components/updatePassword/ChnagePasswordModal"

const DoctorScreen = ({ drType }) => {
  const ActionIcons = item => (
    <div
      style={{
        display: "flex",
        cursor: "pointer",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <select
          value={item?.doctor_status == true ? "Active" : "Disable"}

          onChange={e => {
            deleteDoctor(item?.user_id?._id, e.target?.value)
            // console.log("e.target?.value", e.target?.value)
          }}
        >
          <option>Active</option>
          <option>Disable</option>
        </select>
      </div>
      <div>
        <EditDoctorModal
          buttonLabel={<EditableIcon />}
          getAllDoctors={getAllDoctors}
          editData={item}
        />
      </div>
      <div>
        <ChnagePasswordModal
          buttonLabel={
            <img
              style={{ width: "20px", maxWidth: "20px" }}
              src={change_password}
            />
          }
          getAllDoctors={getAllDoctors}
          editData={item}
        />
      </div>
      <div>
        <DetailsDoctorModal buttonLabel={<FileIcon />} editData={item} />
      </div>
      {/* <div onClick={() => deleteDoctor(item?.user_id)}>
        <DeleteIcon />
      </div> */}
    </div>
  )

  const deleteDoctor = async (id, value) => {
    console.log("firstID", id)
    dispatch(setLoader(true))
    const status = value == "Active" ? true : false

    try {
      const res = await ApiCall({
        route: `doctor/doctor_status_update/${id}&${status}`,
        token: token,
        verb: "put",
      })

      if (res?.status === 200) {
        {
          status ? (
            <>
              {Swal.fire({
                title: "Doctor is Activited",
                text: "successfully",
                timer: 2000,
                showConfirmButton: false,
              })}
            </>
          ) : (
            <>
              {Swal.fire({
                title: "Doctor is Disabled",
                text: "successfully",
                timer: 2000,
                showConfirmButton: false,
              })}
            </>
          )
        }

        dispatch(setLoader(false))
        getAllDoctors()
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  const token = useSelector(state => state.auth.adminToken)
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const getAllDoctors = async () => {
    try {
      const res = await ApiCall({
        route: "doctor/all_doctors",
        token: token,
        verb: "get",
      })

      if (res?.status === 200) {
        setData({
          columns: [
            {
              label: "First Name ",
              field: "first_name",
              sort: "asc",
              width: 150,
            },
            {
              label: "Last Name",
              field: "last_name",
              sort: "asc",
              width: 270,
            },
            {
              label: "Phone Number",
              field: "phone_number",
              sort: "asc",
              width: 200,
            },

            {
              label: "Consultation Type",
              field: "type",
              sort: "asc",
              width: 100,
            },
            {
              label: "Email",
              field: "email",
              sort: "asc",
              width: 100,
            },
            {
              label: "Qualification",
              field: "qualification",
              sort: "asc",
              width: 100,
            },
            {
              label: "Action",
              field: "action",
              sort: "asc",
              width: 100,
            },
          ],
          rows: res?.response?.list.map(items => {
            console.log("Doctor---->", items)
            const {
              first_name,
              last_name,
              phone_number,
              qualification,
              type,
              user_id,
            } = items
            // console.log("first_name",first_name)
            // const speciality = deseases?.desease_name

            // console.log("deseases", speciality)

            return {
              first_name,
              last_name,
              phone_number,
              type,
              qualification,
              email: user_id?.email,
              action: ActionIcons(items),
            }
          }),
        })
        // console.log("doctor-->", res?.response?.list)
        dispatch(setLoader(false))
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }
  // useEffect(() => {
  //   dispatch(setLoader(true))
  //   getAllDoctors()
  // }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="">
            <div className="w-[100%]">
              <h2 className="page-title-dash">Cars</h2>
            </div>
            <div className="w-[100%] flex justify-center  items-center  ">
              {/* <Col md={3}> */}
              {/* <div className="">
                <PopupModal
                  buttonLabel="Add Doctor"
                  className="modal"
                  headertitle="Regular doctor"
                  role="regular"
                  labelfirst="First Name"
                  labelsec="Last Name"
                  qualification="Qualification"
                  drType="Add Doctor"
                  getAllDoctors={getAllDoctors}
                />
              </div> */}

              <h1 className="mt-5">Coming Soon</h1>



              {/* <div className="ml-[]">
                <PopupModal
                  buttonLabel="Add Urgent Doctor"
                  className="modal"
                  headertitle="Add Urgent doctor"
                  role="urgent_care"
                  labelfirst="First Name"
                  labelsec="Last Name"
                  qualification="Qualification"
                  drType="Add Urgent Doctor"
                  getAllDoctors={getAllDoctors}
                />
              </div> */}
              {/* </Col> */}
            </div>
          </div>
          {/* <Row> */}
          {/* <Col className="col-12 ">
            <Card>
              <CardBody>
               
                <MDBDataTable
                  responsive
                  bordered
                  data={data}
                  sortable={false}
                />
              </CardBody>
            </Card>
          </Col> */}
          {/* </Row> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default DoctorScreen

