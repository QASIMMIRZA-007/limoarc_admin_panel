
import React from "react";
import { Table } from "antd";
import "./customTable.scss";
import { FaRegEye } from "react-icons/fa";
import { initial } from "lodash";

const initialColumns = [
  {
    title: "Booking Type",
    dataIndex: "bookingType",
    key: "bookingType",
  },
  {
    title: "Booking Date & Time",
    dataIndex: "bookingDateTime",
    key: "bookingDateTime",
  },
  {
    title: "Pickup Location",
    dataIndex: "pickupLocation",
    key: "pickupLocation",
  },
  {
    title: "Dropoff Location",
    dataIndex: "dropoffLocation",
    key: "dropoffLocation",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span
        style={{
          color:
            status === "Completed"
              ? "green"
              : status === "Ongoing"
              ? "blue"
              : "orange",
          fontWeight: "bold",
        }}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
  },
  {
    title: "Driver Assigned",
    dataIndex: "driverAssigned",
    key: "driverAssigned",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `$${price}`,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => (
      <span role="img" aria-label="view">
    <FaRegEye />
      </span>
    ),
  },
];

const initialData = [
  {
    key: "1",
    bookingType: "Airport Transfer",
    bookingDateTime: "2024-12-21, 10:00 AM",
    pickupLocation: "JFK Airport, NY",
    dropoffLocation: "Times Square, NYC",
    status: "Completed",
    vehicle: "abc",
    driverAssigned: "Alex",
    price: 120,
  },
  {
    key: "2",
    bookingType: "City Ride",
    bookingDateTime: "2024-12-22, 2:00 PM",
    pickupLocation: "Central Park, NYC",
    dropoffLocation: "Empire State Building",
    status: "Upcoming",
    vehicle: "xyz",
    driverAssigned: "Emma",
    price: 80,
  },
  {
    key: "3",
    bookingType: "Hourly Booking",
    bookingDateTime: "2024-12-20, 5:00 PM",
    pickupLocation: "Brooklyn Bridge",
    dropoffLocation: "Statue of Liberty",
    status: "Ongoing",
    vehicle: "bmw",
    driverAssigned: "Chris",
    price: 54,
  },
  {
    key: "4",
    bookingType: "Event Service",
    bookingDateTime: "2024-12-25, 6:00 PM",
    pickupLocation: "Madison Square Garden",
    dropoffLocation: "Hotel Plaza",
    status: "Upcoming",
    vehicle: "hgj",
    driverAssigned: "Sophia",
    price: 140,
  },
];

const CustomTable = ({data = initialData,columns = initialColumns}) => {
  return (
    <div className="TableWrapper">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default CustomTable;
