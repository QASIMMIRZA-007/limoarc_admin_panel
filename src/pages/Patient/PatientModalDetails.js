import React, { useState } from "react"
import user from "../../assets/userProfile.svg"

const PatientModalDetails = ({ item }) => {
  console.log("Patient Details", item)
  return (
    <>
      <div className="px-4 pt-[30px] pb-[30px]">

        <div className="flex justify-center my-3">
          <div className="">
            <img
              src={item?.profile_image ? item?.profile_image : user}
              className="w-[95px] h-[95px] rounded-[50px] "
              alt="profile img"
            />
          </div>
        </div>
        <>
          <div className="my-2">
            <div className="border-b-[3px] border-[#e0e0e0] py-2">
              <h3 className="font-bold text-[#828282] text-[17px] leadings-[29px]">
                Customer Information
              </h3>
            </div>
            <div className="md:flex justify-between flex-wrap">
              <div className="flex md:w-[24%]   py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Full Name:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {(item?.first_name + " " + item?.last_name) || "Qasim mirza"}

                </h3>
              </div>



              <div className="flex md:w-[33%]   py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Phone Nmber:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.phone_number ? item?.phone_number : "+123456789"}
                </h3>
              </div>
              <div className="flex md:w-[24%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Gender:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.gender
                    ? (item?.gender == "male" && "Male") ||
                    (item?.gender == "female" && "Female")
                    : "Male"}
                </h3>
              </div>

              <div className="flex py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Email Address:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.email ? item?.email : "mirzaq620@gmail.com"}
                </h3>
              </div>

              <div className="flex py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Geo Location:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.location?.address ? item?.location?.address : "USA"}
                </h3>
              </div>

              {/* <div className="flex py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Reachable Location:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.japan_email ? item?.japan_email : "---"}
                </h3>
              </div> */}
            </div>
          </div>
        </>
      </div>
    </>
  )
}

export default PatientModalDetails
