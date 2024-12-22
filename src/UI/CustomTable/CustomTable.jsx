// import React from "react";
// import { Space, Table, Tag } from "antd";
// import "./customTable.scss";
// const columns = [
//   {
//     title: "Ride ID",
//     dataIndex: "rideId",
//     key: "rideId",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Pickup Date & Time",
//     dataIndex: "pickupDateTime",
//     key: "pickupDateTime",
//   },
//   {
//     title: "Pickup Location",
//     dataIndex: "pickupLocation",
//     key: "pickupLocation",
//   },
//   {
//     title: "Service Class",
//     dataIndex: "serviceClass",
//     key: "serviceClass",
//   },
//   {
//     title: "Chauffeur/Vehicle",
//     dataIndex: "chauffeurVehicle",
//     key: "chauffeurVehicle",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//     render: (status) => (
//       <span
//         style={{
//           color: status === "Confirmed" ? "green" : "orange",
//           fontWeight: "bold",
//         }}
//       >
//         {status}
//       </span>
//     ),
//   },
// ];

// const initialData = [
//   {
//     key: "1",
//     rideId: "001",
//     pickupDateTime: "2024-10-20 09:30 AM",
//     pickupLocation: "JFK Airport, NY",
//     serviceClass: "First",
//     chauffeurVehicle: "Mark Johnson / BMW 5 Series",
//     status: "Confirmed",
//   },
//   {
//     key: "2",
//     rideId: "002",
//     pickupDateTime: "2024-10-21 02:00 PM",
//     pickupLocation: "Hilton Hotel, Chicago",
//     serviceClass: "Luxury",
//     chauffeurVehicle: "Lisa Wong / Tesla Model X",
//     status: "Ongoing",
//   },
//   {
//     key: "3",
//     rideId: "003",
//     pickupDateTime: "2024-10-22 11:45 AM",
//     pickupLocation: "Heathrow Airport, London",
//     serviceClass: "Business",
//     chauffeurVehicle: "Kevin Taylor / Mercedes Sprinter",
//     status: "Confirmed",
//   },
//   {
//     key: "4",
//     rideId: "004",
//     pickupDateTime: "2024-10-23 08:45 AM",
//     pickupLocation: "LAX, Los Angeles",
//     serviceClass: "Business",
//     chauffeurVehicle: "Sarah Miller / Audi E-Tron",
//     status: "Ongoing",
//   },
//   {
//     key: "5",
//     rideId: "005",
//     pickupDateTime: "2024-10-24 10:15 AM",
//     pickupLocation: "Grand Central Station, NY",
//     serviceClass: "First",
//     chauffeurVehicle: "David Green / Lexus ES",
//     status: "Confirmed",
//   },
// ];

// const CustomTable = ({ data = initialData }) => {
//   return (
//     <div className="TableWrapper">
//       <Table columns={columns} dataSource={data} />
//     </div>
//   );
// };
// export default CustomTable;



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
