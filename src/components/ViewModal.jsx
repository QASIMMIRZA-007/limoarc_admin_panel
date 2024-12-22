import React, { useEffect, useState } from "react"
import { Button, Modal } from "reactstrap"
import { ApiCall } from "Services/apis"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
const ViewModal = ({ item }) => {
  const [open, setOpen] = useState(false)
  const [DoctorList, setDoctorList] = useState([])
  const token = useSelector(state => state.auth.doctorToken)
console.log("open",item?.schedule?.start_time)
console.log("setopen",setOpen)
  const getReAssignDoctors = async () => {
    try {
      const res = await ApiCall({
        route: `doctor/doctor_listing_by_date_time`,
        verb: "post",
        token: token,
        params: {
          category_id: item?.category_id?._id,
          date: item?.schedule?.appointment_date,
          start_time: item?.schedule?.start_time,
          end_time: item?.schedule?.end_time,
        },
      })
console.log("params",params)
      console.log("doctor-list", res)
      if (res?.status == "200") {
        setDoctorList(res?.response?.doctors_listing)
      } else {
        // alert(res?.response?.message);
        Swal.fire("error", res?.response?.message, "error")
        console.log("error", res?.response)
      }
    } catch (e) {
      console.log("saga sign up err --- ", e)
      // yield put(setLoader(false));
    }
  }
  useEffect(() => {
    getReAssignDoctors()
  }, [])
  const toggle = () => setOpen(!open);
  return (
    <>
      <>
        <button
          className="px-4 py-1 rounded-full bg-[#ececec]  outline-0 text-[#a18552] "
          type="primary"
          onClick={toggle}
        >
          Re Assign
        </button>
        
        <Modal
          isOpen={open}
          toggle={toggle}
          size="lg"
          style={{width:'100%',maxWidth:'700',height:'auto'}}
        >
          <div className="flex justify-center pt-[20px]">
            <h3 className="font-bold text-[24px] text-[#0D0D0D] leadings-[29px]">
              Re-assign Doctor
            </h3>
          </div>
          <div className="md:px-[5rem] p-2 my-3">
            <div className="border border-gray-300 rounded-[10px] p-3 overflow-y-auto h-[25rem]">
              {DoctorList?.length > 0 ? (
                DoctorList?.map(item => (
                  <div className="flex justify-between border-b border-gray-300 py-2 ">
                    <div className="left flex">
                      <div className="img">
                        <img
                          src={docimg}
                          alt="patient"
                          className="w-[42px] h-[42px] rounded-full "
                        />
                      </div>
                      <div className="text px-3">
                        <h3 className="text-[#0d0d0d] text-[13px] ">
                          Dr. John Doe
                        </h3>
                        <h3 className="text-[#bdbdbd] text-[13px] ">
                          Orthopedic surgeon
                        </h3>
                      </div>
                    </div>
                    <div>
                      <input type="checkbox" id="checkbox" />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "16rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <img src={emptyMissed} /> */}
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "151.34%",
                      color: "#828282",
                      marginTop: "10px",
                    }}
                  >
                    No Doctor found relative this.
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center pb-[20px]">
            <div className="flex">
              <button
                onClick={() => setOpen(false)}
                className="leadings-[24px] outline-0 text-[#eb5757] h-[45px]  px-[30px] ml-[30px]  "
              >
                Back
              </button>
              <button className="bg-[#a18552] font-[poppins] rounded-[10px] text-gray-50 h-[45px]  px-[30px] font-bold text-[16px] leading-5	 outline-0 ">
                Assign
              </button>
            </div>
          </div>
        </Modal>
      </>
    </>
  )
}

export default ViewModal
