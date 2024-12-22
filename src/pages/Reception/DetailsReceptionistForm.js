import React, { useState } from "react";
// import { Modal } from "antd";
import docImg from "../../assets/userProfile.svg";
// import det from "../../assets/det.svg";
// import phone from "../../assets/phone.svg";

const DetailsReceptionistForm = ({ item }) => {
  const [open, setOpen] = useState(false);
  console.log("Receptionist Detail ", item);

  return (
    <>
      <div className="px-4 pt-[25px] pb-[25px]">
          <div className="flex justify-center">
            <h4 className="font-bold text-[24px] mb-[15px] leadings-[29px]">
              Receptionist Details
            </h4>
          </div>
          <div className="flex justify-center ">
            <div className="">
              <img
                src={item?.profile_image ? item?.profile_image : docImg}
                className="w-[95px] h-[95px] rounded-[50px] "
                alt="image"
              />
            </div>
          </div>
         

          <div className="my-2">
            <div className="border-b-[3px] border-[#e0e0e0] py-2">
              <h3 className="font-bold text-[#828282] text-[17px] leadings-[29px]">
                Receptionist Information
              </h3>
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Full name:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.first_name + " " + item?.last_name}
                </h3>
              </div>
              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Phone Number:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.phone_number}
                </h3>
              </div>

              {/* <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Shift Time:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {new Date(item?.shift_id?.start_time).toLocaleTimeString() + " To " +new Date(item?.shift_id?.end_time).toLocaleTimeString()}
                </h3>
              </div> */}
              <div className="flex md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Email Address:
                </h3>
                <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.user_id?.email}
                </h3>
              </div>

           
              {/* <div className="flex  md:w-[33%] w-[100%] py-3 ">
                <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                  Specialty:
                </h3>
                <h3 className="flex  flex-wrap font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                  {item?.deseases?.map((data, idx) => (
                    <>
                      <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                        {" "}
                        {data?.desease_name}
                      </h3>
                      ,
                    </>
                  ))}
                </h3>
              </div>
              <div className="flex md:w-[33%]  py-3 "></div> */}
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

export default DetailsReceptionistForm;
