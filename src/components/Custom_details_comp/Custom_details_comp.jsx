import React, { useState } from "react"
import "./Custom_details_comp.scss"
import { CiLocationOn, CiUser } from "react-icons/ci"
import { MdDataUsage, MdOutlineMailOutline } from "react-icons/md"
import { IoCallOutline } from "react-icons/io5"
import { BsBriefcase } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"
import { useSelector } from "react-redux"

const Custom_details_comp = ({
  person_name,
  details_title,
  customerData,
  allRides,
  showVehicleDetails,
  showUserDetails,
  isCustomerData,
  dataType, 
}) => {
  const [showContent, setShowContent] = useState(false);

  const onIconClick = () => {
    setShowContent(!showContent);
  };

  const data = dataType === "customer" ? customerData : allRides;

  const customer_data = [
    { id: 1, icon: <MdDataUsage />, text: "Booking type", linkText: data?.bookingType },
    {
      id: 2,
      icon: <IoCallOutline />,
      text: "Contact No.",
      linkText: data?.phone || "N/A",
    },
    {
      id: 4,
      icon: <MdOutlineMailOutline />,
      text: "Email Address",
      linkText: data?.email || "N/A",
    },
    { id: 3, icon: <CiUser />, text: "Gender", linkText: data?.gender || "N/A" },
  ];

  const vehicle_data = [
    {
      id: 1,
      icon: <MdDataUsage />,
      text: "Brand model",
      linkText: data?.vehicleId?.brand_model || "N/A",
    },
    {
      id: 2,
      icon: <IoCallOutline />,
      text: "Color",
      linkText: data?.vehicleId?.color || "N/A",
    },
    {
      id: 3,
      icon: <CiUser />,
      text: "Number Plate",
      linkText: data?.vehicleId?.number_plate || "N/A",
    },
    {
      id: 4,
      icon: <MdOutlineMailOutline />,
      text: "Manufacture Year",
      linkText: data?.vehicleId?.manufacture_year || "N/A",
    },
  ];

  return (
    <div className="Custom_details_comp_wrapp">
      <div className="user_details_container">
        <div
          style={{ paddingBottom: showContent ? "20px" : "0" }}
          className="user_details_container_flex"
        >
          <h3>{details_title}</h3>
          <IoIosArrowDown onClick={onIconClick} />
        </div>
        {showContent && (
          <>
            <div className="user_details_container_header">
              <div className="flex">
                {showVehicleDetails && (
                  <div className="imageWrapper">
                    <img
                      src={
                        data?.vehicleId?.vehicleImages?.[0] ||
                         "https://s7d1.scene7.com/is/image/hyundai/compare-vehicle-1225x619?wid=276&hei=156&fmt=webp-alpha"

                      }
                      alt="Vehicle"
                    />
                    <img
                      src={
                        data?.vehicleId?.vehicleImages?.[1] ||
                         "https://s7d1.scene7.com/is/image/hyundai/compare-vehicle-1225x619?wid=276&hei=156&fmt=webp-alpha"

                      }
                      alt="Vehicle"
                    />
                    <img
                      src={
                        data?.vehicleId?.vehicleImages?.[2] ||
                         "https://s7d1.scene7.com/is/image/hyundai/compare-vehicle-1225x619?wid=276&hei=156&fmt=webp-alpha"

                      }
                      alt="Vehicle"
                    />
                  </div>
                )}
                {showUserDetails && (
                  <div className="user_details">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_SMzhJJLBMH7eGI-p8qhbUkBkWE4u5XHrRay7vdQMKOinZ_KrLz1K_Y&s"
                      alt="User Avatar"
                    />
                    <div>
                      <h4>{person_name}</h4>
                      <p>Specialized in consistent exercise routines and proper nutrition.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="specialFlexWrapper">
              {(isCustomerData ? customer_data : vehicle_data || [])?.map((item) => (
                <div key={item.id} className="specialFlexWrapp">
                  <div className="specialFlex">
                    {item.icon}
                    <h4>{item.text}</h4>
                  </div>
                  <li>{item.linkText || "N/A"}</li>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Custom_details_comp;
