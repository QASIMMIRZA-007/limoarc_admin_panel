import React, { useState } from "react"
// import { Modal } from "antd";
import docImg from "../../assets/user2.png"
// import det from "../../assets/det.svg";
// import phone from "../../assets/phone.svg";

const DetailsPharmacyForm = ({ item }) => {
  const [open, setOpen] = useState(false)
  console.log("PharmacyDetails ", item)

  return (
    <>
      <div className="px-4 pt-[25px] pb-[25px]">
        <div className="flex justify-center">
          <h4 className="font-bold text-[24px] mb-[15px] leadings-[29px]">
            Pharmacy Details
          </h4>
        </div>
        {/* <div className="flex justify-center ">
            <div className="">
              <img
                src={item?.profile_image ? item?.profile_image : docImg}
                className="w-[95px] h-[95px] rounded-[10px] "
                alt="patient profile img"
              />
            </div>
          </div> */}

        <div className="my-2">
          <div className="border-b-[3px] border-[#e0e0e0] py-2">
            <h3 className="font-bold text-[#828282] text-[17px] leadings-[29px]">
              Pharmacy Information
            </h3>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="flex md:w-[50%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Pharmacy Name:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.pharmacy_name}
              </h3>
            </div>
            <div className="flex md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Added By:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.added_by}
              </h3>
            </div>
            <div className="flex md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Fax Number:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.fax_number}
              </h3>
            </div>
            <div className="flex  md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Phone Number:
              </h3>
              <h3 className="flex  flex-wrap font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.phone_number}
              </h3>
            </div>
            <div className="flex md:w-[50%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Address:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.location?.address}
              </h3>
            </div>

            <div className="flex md:w-[50%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Geo Location:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.location?.geo_address}
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
  )
}

export default DetailsPharmacyForm
