import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { BASE_URL } from "Services/Constants";
import "./booking.css";
import { useDispatch, useSelector } from "react-redux";
import {Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { setLoader } from "Redux/Actions/GeneralActions";
import Loader from "components/Loader/Loader";

const BookingScreen = () => {
    const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({
    columns: [],
    rows: [],
  });
  const token = useSelector((state) => state.auth.adminToken);
  const dispatch = useDispatch();

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}admin/all-bookings`,{
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        setLoading(false)
        const bookings = response.data.bookings;
        console.log("Bookings:", bookings);
        formatTableData(bookings);
      }
    } catch (error) {
      dispatch(setLoader(false));
      console.error("Error fetching bookings:", error);
      setLoading(true)
    }
    
  };

  const formatTableData = (bookings) => {
    const columns = [
      // { label: "Booking ID", field: "id", sort: "asc", width: 200 },
      { label: "Customer Name", field: "customerName", sort: "asc", width: 150 },
      { label: "Booking Type", field: "bookingType", sort: "asc", width: 120 },
      // { label: "Start Date", field: "startDate", sort: "asc", width: 150 },
      // { label: "End Date", field: "endDate", sort: "asc", width: 150 },
      { label: "Price", field: "price", sort: "asc", width: 100 },
      { label: "Payment Status", field: "paymentStatus", sort: "asc", width: 120 },
      { label: "Status", field: "status", sort: "asc", width: 120 },
      { label: "Action", field: "action", sort: "asc", width: 100 },
    ];

    const rows = bookings.map((booking) => ({
      // id: booking._id,
      customerName: booking.customerId
        ? `${booking.customerId.firstName} ${booking.customerId.lastName}`
        : "N/A",
      bookingType: booking.bookingType,
      // startDate: new Date(booking.startDate).toLocaleString(),
      // endDate: new Date(booking.endDate).toLocaleString(),
      price: `$${booking.price}`,
      paymentStatus: (
        <span
          className={
            booking.paymentStatus === "completed"
              ? "text-success"
              : booking.paymentStatus === "pending"
              ? "text-warning"
              : "text-danger"
          }
        >
          {booking.paymentStatus}
        </span>
      ),
      status: (
        <span
          className={
            booking.status === "completed"
              ? "text-success"
              : booking.status === "pending"
              ? "text-warning"
              : "text-success"
          }
        >
          {booking.status}
        </span>
      ),
      action: (
        <Link
          to={{pathname:`/admin/booking-details/${booking._id}`,state:{booking}}}
        >
          <FaRegEye />
        </Link>
      ),
    }));

    setTableData({ columns, rows });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
  {loading && <Loader />}
    <div className="page-content">
      <div className="container-fluid">
        <h3 style={{marginTop:"50px"}}>Bookings</h3>
        <MDBDataTable
          responsive
          bordered
          data={tableData}
          sortable={true}
          paging={true}
        />
      </div>
    </div>
    </>
  );
};

export default BookingScreen;
