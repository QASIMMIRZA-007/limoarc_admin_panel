import React, { useState } from "react";
import docImg from "../../assets/userProfile.svg";
import DetailsPage from "pages/DetailPage/DetailPage";


const DetailsBookingForm = ({ item }) => {
  // console.log("itemBooking",item)

  return (
    // <>
    // <DetailsPage />
    // </>
    <>
      <div className="px-4 pt-[25px] pb-[25px]">
          <div className="flex justify-center">
            <h4 className="font-bold text-[24px] mb-[15px] leadings-[29px]">
              Booking Details
            </h4>
          </div>
          <div className="flex justify-center ">
            <div className="">
              <img
                src={item?.personal_info?.user_id?.profile_image ? item?.personal_info?.user_id?.profile_image : docImg}
                className="w-[95px] h-[95px] rounded-[50px] "
                alt="image"
              />
            </div>
          </div>
         

          <div className="my-2">
            <div className="border-b-[3px] border-[#e0e0e0] py-2">
              <h3 className="font-bold text-[#828282] text-[17px] leadings-[29px]">
                Booking Information
              </h3>
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Patient Name:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.personal_info?.user_id?.first_name + " " +item?.personal_info?.user_id?.last_name}
                </h3>
              </div>
              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Schedule:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.schedule ? item?.schedule?.appointment_date : new Date(item?.createdAt).getFullYear()+"-"+new Date(item?.createdAt).getMonth()+"-"+new Date(item?.createdAt).toLocaleString("en-US", { day : '2-digit'})}
                </h3>
              </div>

              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Doctor Name:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.doctor_id ? item?.doctor_id?.first_name + " " + item?.doctor_id?.last_name : '-----'}
                </h3>
              </div>

              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Condition:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.category_id?.category_name}
                </h3>
              </div>
              <div className="flex  md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Status:
                </h3>
                <h3 className="flex  flex-wrap font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.booking_status}
                  {/* {item?.deseases?.map((data, idx) => (
                    <>
                      <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                        {" "}
                        {data?.desease_name}
                      </h3>
                      ,
                    </>
                  ))} */}
                </h3>
              </div>
              <div className="flex md:w-[33%]  py-3 "></div>
            </div>
          </div>
          {/* MEdical history  */}
          <div className="my-2">
            {/* <div className="border-b-[3px] border-[#828282] py-2">
              <h3 className="font-bold text-[#828282] text-[17px] leadings-[29px]">
                Previous Medical history
              </h3>
            </div> */}
            {/* <div className="flex justify-center">
              <h4 className="py-5 text-gray-500 font-medium text-[18px] ">
                Comming Soon...
              </h4>
            </div> */}
            {/* <div className="md:flex justify-between flex-wrap">
              <div className="flex w-[30%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  What brings you here?:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.category_id?.category_name}
                </h3>
              </div>
              <div className="flex w-[30%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Allergies:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.medical_history?.allergy}
                </h3>
              </div>
              <div className="flex w-[30%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Medications:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.medical_history?.medication}
                </h3>
              </div>
              <div className="flex w-[30%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Past medical history:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.medical_history?.past_history}
                </h3>
              </div>
              <div className="flex w-[30%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Pregnancy status:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.medical_history?.pregnancy_status}
                </h3>
              </div>
            </div> */}
          </div>
      </div>
    </>
  );
};

export default DetailsBookingForm;
