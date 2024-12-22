// import React, { useState } from "react"
// import {
//   Select,
//   MenuItem,
//   FormHelperText,
//   FormControl,
//   InputLabel,
// } from "@material-ui/core"
// import "./FAQ.css"
// import { MDBDataTable } from "mdbreact"

// import { Row, Col } from "reactstrap"

// // import MedConditionModal from "common/data/MedConditionModal"

// import { ApiCall } from "Services/apis"
// import Swal from "sweetalert2"
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { setLoader } from "Redux/Actions/GeneralActions"
// import FAQModal from "./FAQModal"
// import { set } from "lodash"
// import DeleteIcon from "assets/fonts/DeleteIcon"
// import EditableIcon from "assets/fonts/EditableIcon"
// import EditFAQModal from "./EditFAQModal"

// const FAQScreen = () => {
//   const [selected, setSelected] = useState("")
//   const [open, setOpen] = React.useState(false)
//   const selectionChangeHandler = event => {
//     setSelected(event.target.value)
//   }
//   const [getFAQ, setGetFAQ] = useState([])
//   const [menu, setMenu] = useState(false)
//   const toggle = () => {
//     setMenu(!menu)
//   }
//   const token = useSelector(state => state.auth.adminToken)
//   const dispatch = useDispatch()
//   const [selectedGroup, setselectedGroup] = useState([])

//   // console.log("render------>",render)
//   const getFAQFun = async () => {
//     try {
//       const res = await ApiCall({
//         route: `faqs/faq_listing`,
//         token: token,
//         verb: "get",
//       })

//       if (res?.status == "200") {
//         dispatch(setLoader(false))
//         setGetFAQ(res?.response?.allergy)

//         console.log("first", res?.response?.allergy)
//       } else {
//         dispatch(setLoader(false))

//         // console.log(res?.response?.message, "error in response ");
//         Swal.fire(res?.response?.message, "Try again", "error")
//       }
//     } catch (e) {
//       // console.log(e?.response?.message, "error in response ");
//       console.log(e)
//       Swal.fire(e?.response?.message, "Try again", "error")
//     }
//   }

//   useEffect(() => {
//     dispatch(setLoader(true))
//     getFAQFun()
//   }, [])

//   const deleteFAQ = async (id, value) => {
//     dispatch(setLoader(true))
//     const status = value === "Active" ? true : false

//     try {
//       const res = await ApiCall({
//         route: `faqs/update_faq_status/${id}&${status}`,
//         token: token,
//         verb: "put",
//       })

//       if (res?.status === 200) {
//         {
//           status ? (
//             <>
//               {Swal.fire({
//                 title: "FAQ is Activited",
//                 text: "successfully",
//                 timer: 2000,
//                 showConfirmButton: false,
//               })}
//             </>
//           ) : (
//             <>
//               {Swal.fire({
//                 title: "FAQ is Disabled",
//                 text: "successfully",
//                 timer: 2000,
//                 showConfirmButton: false,
//               })}
//             </>
//           )
//         }

//         dispatch(setLoader(false))
//         getFAQFun()
//       } else {
//         Swal.fire(`${res.response.message}`, "Try again", "error")
//         dispatch(setLoader(false))
//       }
//     } catch (e) {
//       console.log("saga login error -- ", e.toString())
//       dispatch(setLoader(false))
//     }
//   }

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <div className="container-fluid">
//           <div className=" flex justify-between items-center">
//             <div className="w-[100%]">
//               <h2 className="page-title-dash">FAQs</h2>
//             </div>
//             <div className="w-[100%]">
//               <div className="float-end d-md-block">
//                 <FAQModal buttonLabel="Add FAQ" getFAQFun={getFAQFun} />
//               </div>
//             </div>
//           </div>
//           {/* {getFAQ.map((item, index) => (
//             <MedicalConditionCom getFAQFun={getFAQFun} item={item} />
//           ))} */}
//           <div className="">
//             {getFAQ.map(item => (
//               <>
//                 <div
//                   className=" mainFaQ cursor-pointer "
//                   onClick={() => {
//                     selectedGroup == item?._id
//                       ? setselectedGroup(null)
//                       : setselectedGroup(item?._id)
//                   }}
//                 >
//                   <div className="d-flex align-items-center justify-content-space-between">
//                     <h2 className="FAQquestion md:w-[90%] w-[60%]">
//                       {item?.question + " "}
//                       {selectedGroup == item?._id ? (
//                         <i
//                           class="fa fa-angle-down text-[#828282]"
//                           aria-hidden="true"
//                         ></i>
//                       ) : (
//                         <i
//                           class="fa fa-angle-right text-[#828282]"
//                           aria-hidden="true"
//                         ></i>
//                       )}
//                     </h2>
//                     <div className="ml-auto  pr-[12px] flex">
//                       <select
//                         className="bg-white"
//                         defaultValue={
//                           item?.status === true ? "Active" : "In-active"
//                         }
//                         onChange={e => {
//                           deleteFAQ(item?._id, e.target?.value)
//                           console.log("e.target?.value", e.target?.value)
//                         }}
//                       >
//                         <option value="Active">Active</option>
//                         <option value="In-active">Disable</option>
//                       </select>
//                       <div>
//                         <EditFAQModal
//                           buttonLabel={<EditableIcon />}
//                           getFAQFun={getFAQFun}
//                           item={item}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     {selectedGroup === item?._id ? (
//                       <div className="FAQAnswer pr-2">
//                         <p>{item?.answer}</p>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               </>
//             ))}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   )
// }

// export default FAQScreen





import React, { useState, useEffect } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core"
import { MDBDataTable } from "mdbreact"
import { Row, Col } from "reactstrap"
import Swal from "sweetalert2"
import { useDispatch } from "react-redux"
import { setLoader } from "Redux/Actions/GeneralActions"
import FAQModal from "./FAQModal"
import EditFAQModal from "./EditFAQModal"
import EditableIcon from "assets/fonts/EditableIcon"

const FAQScreen = () => {
  const [selected, setSelected] = useState("")
  const [selectedGroup, setselectedGroup] = useState(null)
  const [getFAQ, setGetFAQ] = useState([])
  const dispatch = useDispatch()

  const dummyFAQData = [
    {
      _id: "1",
      question: "How do I reset my password?",
      answer: "Go to the settings page and click 'Forgot Password'.",
      status: true,
    },
    {
      _id: "2",
      question: "How do I contact support?",
      answer: "Email us at support@example.com or call +123456789.",
      status: true,
    },
    {
      _id: "3",
      question: "What is the refund policy?",
      answer: "You can request a refund within 30 days of purchase.",
      status: false,
    },
  ]

  const getFAQFun = () => {
    try {
      dispatch(setLoader(true))
      setGetFAQ(dummyFAQData) // Set dummy data
      dispatch(setLoader(false))
    } catch (e) {
      console.error("Error loading FAQs: ", e)
      Swal.fire("Failed to load data", "Try again", "error")
      dispatch(setLoader(false))
    }
  }

  const deleteFAQ = (id, value) => {
    dispatch(setLoader(true))
    const status = value === "Active" ? true : false

    try {
      const updatedFAQ = getFAQ.map(faq =>
        faq._id === id ? { ...faq, status } : faq
      )
      setGetFAQ(updatedFAQ)
      Swal.fire(
        `FAQ is ${status ? "Activated" : "Disabled"}`,
        "Successfully",
        "success"
      )
      dispatch(setLoader(false))
    } catch (e) {
      console.error("Error updating FAQ status: ", e)
      Swal.fire("Failed to update status", "Try again", "error")
      dispatch(setLoader(false))
    }
  }

  useEffect(() => {
    getFAQFun()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="flex justify-between items-center my-[20px]">
            <h2 className="page-title-dash" style={{margin:"0",padding:"0"}}>FAQs</h2>
            <FAQModal buttonLabel="Add FAQ" getFAQFun={getFAQFun} />
          </div>
          <div>
            {getFAQ.map(item => (
              <div
                key={item._id}
                className="mainFaQ cursor-pointer"
                onClick={() =>
                  setselectedGroup(
                    selectedGroup === item._id ? null : item._id
                  )
                }
              >
                <div className="d-flex align-items-center justify-content-space-between">
                  <h2 className="FAQquestion md:w-[90%] w-[60%]">
                    {item.question}{" "}
                    {selectedGroup === item._id ? (
                      <i
                        className="fa fa-angle-down text-[#828282]"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        className="fa fa-angle-right text-[#828282]"
                        aria-hidden="true"
                      ></i>
                    )}
                  </h2>
                  <div className="ml-auto pr-[12px] flex">
                    <select
                      className="bg-white"
                      defaultValue={item.status ? "Active" : "In-active"}
                      onChange={e => deleteFAQ(item._id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="In-active">Disable</option>
                    </select>
                    <EditFAQModal
                      buttonLabel={<EditableIcon />}
                      getFAQFun={getFAQFun}
                      item={item}
                    />
                  </div>
                </div>
                {selectedGroup === item._id && (
                  <div className="FAQAnswer pr-2">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FAQScreen

