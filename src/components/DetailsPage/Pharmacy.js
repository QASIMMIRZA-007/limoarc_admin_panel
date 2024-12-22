// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import Swal from "sweetalert2";
// import { setLoader } from "../../../Redux/Actions/GeneralActions";
// import { ApiCall } from "../../../Services/apis";
// import NavigationMap from "../../NavigationMap/NavigationMap"
import "../../pages/DetailPage/DetailPage.css";
const Pharmacy = ({bookingDetail}) => {
  console.log("first",bookingDetail)
//   const dispatch = useDispatch();
//   const [pharmacyDetails,setPharmacyDetails] = useState();
//   const{id} = useParams();
//   const token = useSelector((state) =>state.auth.userToken);

  // const getPharmacyDetail = async () => {
  //   try {
  //     dispatch(setLoader(true));
  //     const res = await ApiCall({
  //       route: `prescription/send_prescription_request/${id}`,
  //       verb: "get",
  //       token: token,
  //     });
  //     if (res?.status == "200") {
  //       console.log("pharmacy =>", res?.response);
  //       setPharmacyDetails(res?.response?.booking_detail);
  //       dispatch(setLoader(false));
  //     } else {
  //       console.log("error", res.response);
  //       Swal.fire(res.response.message, "", "error");
  //       dispatch(setLoader(false));
  //     }
  //   } catch (e) {
  //     dispatch(setLoader(false));

  //     console.log("saga login error -- ", e.toString());
  //   }
  // };
  // useEffect(()=>{
  //   getPharmacyDetail();
  // },[])
  return (
    <>
     <div className="ml-[40px]">
        <div className="flex  pt-[10px] gap-3">
          <h3 className="questionss">Pharmacy Name:</h3>
          <p className="answer">{bookingDetail?.pharmacy_id?.pharmacy_name}</p>
          </div>
          <div className="flex  pt-[10px] gap-3  ">
          <h3 className="questionss">Contact No:</h3>
          <p className="answer">{bookingDetail?.pharmacy_id?.phone_number}</p>
          </div>
          <div className="flex  pt-[10px] gap-3">
          <h3 className="questionss">Fax Number:</h3>
          <p className="answer">{bookingDetail?.pharmacy_id?.fax_number}</p>
          </div>
          <div className="flex  pt-[10px] gap-3">
          <h3 className="questionss">Location:</h3>
          <p className="answer">{bookingDetail?.pharmacy_id?.location?.address}</p>
          </div>
          {/* <NavigationMap /> */}
         
      </div>
    </>
  )
}

export default Pharmacy