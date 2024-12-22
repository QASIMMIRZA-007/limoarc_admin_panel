// import React, { useEffect, useState } from "react"
// import { MDBDataTable } from "mdbreact"
// import Rating from "@mui/material/Rating"
// import { Row, Col, Card, CardBody } from "reactstrap"
// import { Link } from "react-router-dom"
// import EditModal from "common/data/EditModal"
// import Swal from "sweetalert2"
// import FileIcon from "assets/fonts/FileIcon"

// import "./reviews.scss"

// import { useDispatch, useSelector } from "react-redux"
// import { setLoader } from "Redux/Actions/GeneralActions"
// import { ApiCall } from "Services/apis"
// import DetailsDoctorModal from "pages/Doctor/DetailsDoctorModal"

// const Reviews = () => {
//   const token = useSelector(state => state.auth.adminToken)
//   const [data, setData] = useState([])
//   const dispatch = useDispatch()

//   const getPaymentHistory = async () => {
//     try {
//       const res = await ApiCall({
//         route: "review/review_listing",
//         token: token,
//         verb: "get",
//       })

//       console.log(res)

//       if (res?.status === 200) {
//         setData({
//           columns: [
//             {
//               label: "Patient name",
//               field: "patient_name",
//               sort: "asc",
//               width: 150,
//             },
//             {
//               label: "Doctor name",
//               field: "doctor_name",
//               sort: "asc",
//               width: 270,
//             },
//             {
//               label: `Consultation type`,
//               field: "consultation_type",
//               sort: "asc",
//               width: 200,
//             },
//             {
//               label: "Comments",
//               field: "comment",
//               sort: "asc",
//               width: 100,
//             },
//             {
//               label: "Stars",
//               field: "rating",
//               sort: "asc",
//               width: 100,
//             },
//           ],
//           rows: res?.response.list.map(items => {
//             const consultation_type = items.booking_id.booking_type
//             const patient_name =
//               items?.user_id?.first_name + " " + items?.user_id?.last_name
//             const doctor_name =
//               items?.doctor_id?.first_name + " " + items?.doctor_id?.last_name

//             return {
//               patient_name: (
//                 <EditModal
//                   buttonLabel={patient_name}
//                   // getAllpatient={getAllpatient}
//                   editData={items?.user_id}
//                 />
//               ),
//               consultation_type: (
//                 <p className="w-[100%] d-flex justify-content-between gap-[10px]">
//                   {consultation_type}
//                   <div
//                     style={{
//                       display: "flex",
//                       cursor: "pointer",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Link to={`/admin/details/${items.booking_id._id}`}>
//                       <FileIcon />
//                     </Link>
//                   </div>
//                 </p>
//               ),
//               doctor_name: items?.doctor_id?.first_name ? (
//                 <DetailsDoctorModal
//                   buttonLabel={doctor_name}
//                   editData={items?.doctor_id}
//                 />
//               ) : (
//                 // <EditModal
//                 //   buttonLabel={doctor_name}
//                 //   // getAllpatient={getAllpatient}
//                 //   editData={items?.doctor_id}
//                 // />
//                 "---"
//               ),
//               comment: items.comment,
//               rating: <Rating value={items.rating} readOnly />,
//             }
//           }),
//         })
//         // console.log("History", res?.response?.history)
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
//     getPaymentHistory()
//   }, [])

//   function handleSelectGroup(selectedGroup) {
//     setselectedGroup(selectedGroup)
//   }

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <div className="container-fluid">
//           <h2 className="page-title-dash mb-[10px]">Reviews</h2>

//           <Row>
//             <Col className="col-12">
//               <Card>
//                 <CardBody>
//                   <MDBDataTable
//                     responsive
//                     bordered
//                     data={data}
//                     sortable={false}
//                   />
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </React.Fragment>
//   )
// }

// export default Reviews





import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import Rating from "@mui/material/Rating"
import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import EditModal from "common/data/EditModal"
import FileIcon from "assets/fonts/FileIcon"

import "./reviews.scss"

import { useDispatch, useSelector } from "react-redux"
import { setLoader } from "Redux/Actions/GeneralActions"
import DetailsDoctorModal from "pages/Doctor/DetailsDoctorModal"

const Reviews = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()




  // Dummy data array 
  // 
  // const fetchFeedbacks = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("/booking/admin/feedbacks"); // Adjust the base URL if needed
  //     setFeedbacks(response.data);
  //     console.log("Feedbacks:", response.data);
  //   } catch (err) {
  //     console.error("Error fetching feedbacks:", err);
  //     setError("Failed to load feedbacks. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchFeedbacks();
  // }, []);

  // // Handle loading state
  // if (loading) {
  //   return <div>Loading feedbacks...</div>;
  // }

  // // Handle error state
  // if (error) {
  //   return <div>{error}</div>;
  // }

  const dummyReviews = [
    {
      booking_id: { _id: "1", booking_type: "Online" },
      user_id: { first_name: "John", last_name: "Doe" },
      doctor_id: { first_name: "Dr. Smith", last_name: "Johnson" },
      comment: "Great service!",
      rating: 4,
      review_date: "2 - 10 - 24"
    },
    {
      booking_id: { _id: "2", booking_type: "Physically visited" },
      user_id: { first_name: "Jane", last_name: "Doe" },
      doctor_id: { first_name: "Dr. Emily", last_name: "Davis" },
      comment: "Very helpful and professional.",
      rating: 5,
      review_date: "12 - 2 - 24"
    },
    {
      booking_id: { _id: "3", booking_type: "Online" },
      user_id: { first_name: "Alice", last_name: "Smith" },
      doctor_id: {},
      comment: "Good consultation but can improve.",
      rating: 3,
      review_date: "22 - 12 - 24"
    },
  ]

  const loadData = () => {
    setData({
      columns: [
        {
          label: "Customer Name",
          field: "patient_name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Review Date ",
          field: "review_date",
          sort: "asc",
          width: 150,
        },
        // {
        //   label: "Doctor Name",
        //   field: "doctor_name",
        //   sort: "asc",
        //   width: 270,
        // },
        {
          label: "Booking Type",
          field: "consultation_type",
          sort: "asc",
          width: 200,
        },
        {
          label: "Comments",
          field: "comment",
          sort: "asc",
          width: 100,
        },
        {
          label: "Stars",
          field: "rating",
          sort: "asc",
          width: 100,
        },
      ],
      rows: dummyReviews.map((item) => {
        const consultation_type = item.booking_id.booking_type
        const patient_name = `${item.user_id.first_name} ${item.user_id.last_name}`
        const doctor_name = item.doctor_id.first_name
          ? `${item.doctor_id.first_name} ${item.doctor_id.last_name}`
          : "---"
        const review_date = item.review_date
        return {
          patient_name: (
            <EditModal buttonLabel={patient_name} editData={item.user_id} />
          ),
          consultation_type: (
            <p className="w-[100%] d-flex justify-content-between gap-[10px]">
              {consultation_type}
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {/* <Link to={`/admin/details/${item.booking_id._id}`}>
                  <FileIcon />
                </Link> */}
              </div>
            </p>
          ),
          doctor_name: item.doctor_id.first_name ? (
            <DetailsDoctorModal
              buttonLabel={doctor_name}
              editData={item.doctor_id}
            />
          ) : (
            "---"
          ),
          comment: item.comment,
          rating: <Rating value={item.rating} readOnly />,
          review_date: review_date
        }
      }),
    })
    dispatch(setLoader(false))
  }

  useEffect(() => {
    dispatch(setLoader(true))
    loadData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="page-title-dash mb-[10px]">Reviews</h2>

          <Row>
            <Col className="col-12">
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
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Reviews
