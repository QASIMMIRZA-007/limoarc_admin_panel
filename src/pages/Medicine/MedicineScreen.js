import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link } from "react-router-dom";
import { setLoader } from "Redux/Actions/GeneralActions";
import CustomDetailsModal from "UI/CustomerDetailsModal/CustomerDetailsModal.jsx";
import Swal from "sweetalert2";
import { FaRegEye, FaRegFileAlt } from "react-icons/fa";
import "./medicineScreen.scss";
import { BASE_URL } from "Services/Constants";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const MedicalScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const token = useSelector((state) => state.auth.adminToken);
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    columns: [
      {
        label: "Booking Type",
        field: "bookingType",
        sort: "asc",
        width: 150,
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "asc",
        width: 270,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
      {
        label: "Price",
        field: "price",
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
    rows: [],
  });
  const dateToFormat = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } 
  const ActionIcons = ({ item, customerData }) => {
    console.log("Customer Data in ActionIcons:", customerData); 
    return (
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <Link
          to={{
            pathname: `/admin/booking-details/${item?._id}`,
            state: { booking: item, customer: customerData },
          }}
        >
          <FaRegEye />
        </Link>
      </div>
    );
  };
  

  const transformBookingsToTableRows = (bookings,customerData) => {
    return bookings.map((booking) => ({
      bookingType: booking.bookingType || "N/A", 
      startDate: dateToFormat(booking.startDate) || "N/A", 
      status: booking.status || "N/A",
      price: `$${booking.price.toFixed(2)}`,
      action: <ActionIcons item={booking} customerData={customerData} />,
    }));
    
  };


  const customerDataById = async (customerId) => {
    dispatch(setLoader(true));
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}admin/single-customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === 200) {
        const customer = res.data;
        setCustomerData(customer); 
        setLoading(false);
  
        const transformedRows = transformBookingsToTableRows(customer.bookings, customer);
        setData((prevData) => ({
          ...prevData,
          rows: transformedRows,
        }));
  
        dispatch(setLoader(false));
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error");
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log("Error fetching customer data:", e.toString());
      dispatch(setLoader(false));
    }
  };
  

  useEffect(() => {
    if (id) {
      customerDataById(id);
    }
  }, [id]);
  

  useEffect(() => {
    console.log("Customer Data Updated:", customerData);
  }, [customerData]);
  
  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="w-[100%] my-[5px]">
            <div className="w-[100%]">
              <CustomDetailsModal isCustomer={true} customerData={customerData?.customer} details_title="Customer Information" />
              <div className="MDBDataTable_wrapp">
                <h2>Rides Booking</h2>
                <MDBDataTable responsive footer={false} bordered data={data} sortable={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MedicalScreen;
