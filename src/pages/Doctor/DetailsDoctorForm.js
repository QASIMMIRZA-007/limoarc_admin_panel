import React, { useState } from "react"
import docImg from "../../assets/userProfile.svg"

const DetailsDoctorForm = ({ item }) => {
  const [open, setOpen] = useState(false)
  console.log("Doctor Details ", item)

  return (
    <>
      <div className="px-4 pt-[25px] pb-[25px]">
        <div className="flex justify-center">
          <h4 className="font-bold text-[24px] mb-[15px] leadings-[29px]">
            Doctor Details
          </h4>
        </div>
        <div className="flex justify-center ">
          <div className="">
            <img
              src={item?.profile_image ? item?.profile_image : docImg}
              className="w-[95px] h-[95px] rounded-[50px] object-cover"
              alt="image"
            />
          </div>
        </div>

        <div className="my-2">
          <div className="border-b-[3px] border-[#e0e0e0] py-2">
            <h3 className="font-bold text-[#828282] text-[17px] leadings-[29px]">
              Doctor Information
            </h3>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="flex md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Full Name:
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

            <div className="flex md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Consultation Type:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.type}
              </h3>
            </div>

            <div className="flex md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Qualification:
              </h3>
              <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.qualification}
              </h3>
            </div>
            <div className="flex  md:w-[33%] w-[100%] py-3 ">
              <h3 className="font-normal text-[#828282] text-[12px] leadings-[29px]">
                Specialty:
              </h3>
              <h3 className="flex  flex-wrap font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                {item?.deseases?.map((data, idx) => (
                  <>
                    <h3 className="font-normal text-[#ododod] px-1 text-[12px] leadings-[29px]">
                      {data?.desease_name}
                      {", "}
                    </h3>
                  </>
                ))}
              </h3>
            </div>
            <div className="flex md:w-[33%]  py-3 "></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsDoctorForm
