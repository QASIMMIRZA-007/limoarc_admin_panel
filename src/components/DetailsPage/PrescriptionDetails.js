import { useState, useEffect } from "react"
import "../../pages/DetailPage/DetailPage.css"
import "./PrescriptionDetail.scss"

const PrescriptionDetails = ({ bookingDetail, getConsultatioDetail }) => {
  const [selected, setSelected] = useState()
  const [call, setCall] = useState(true)

  // useEffect(() => {
  //   getConsultatioDetail()
  // }, [call])

  return (
    <>
      {bookingDetail?.prescriptions.length > 0 ? (
        <div className="prescriptionDetails-cont">
          <div className="prescriptions-main-container">
            {bookingDetail?.prescriptions?.map((el, index) => {
              return (
                <div className="single-prescription-details-container">
                  <div className="single-prescription-header">
                    <div className="single-prescription-header-div">
                      <h5>{new Date(el?.createdAt).toLocaleDateString()}</h5>
                    </div>
                    <div className="single-prescription-header-div">
                      {el?.pharmacy_id && (
                        <>
                          <div
                            className="text-[#737171] bg-[#fff]  rounded-[15.5px] pt-[5px] pb-[5px] pl-[20px] pr-[20px] font-bold leading-4 cursor-pointer ml-[10px] show-only-on-desktop"
                            onClick={() => setShowModal(true)}
                            title="Pharmacy Name"
                          >
                            {el?.pharmacy_id?.pharmacy_name}
                          </div>
                        </>
                      )}
                      <h4
                        className={`status-prescription ${
                          el?.prescription_status ? " green-status" : "yellow"
                        }`}
                      >
                        {el?.prescription_status ? "Sent" : "Pending"}
                      </h4>
                      <i
                        className={`ti-angle-${
                          selected === el?._id ? "up" : "down"
                        } mt-[1px] text-[12px] px-2 cursor-pointer`}
                        onClick={() => {
                          if (selected !== el?._id) {
                            setSelected(el?._id)
                          } else {
                            setSelected(null)
                          }
                        }}
                      ></i>
                    </div>
                  </div>
                  {selected === el?._id && (
                    <>
                      {el?.pharmacy_id && (
                        <div className="single-prescription-side-by-side show-only-on-mobile">
                          <div
                            className="text-[#737171] bg-[#fff]  rounded-[15.5px] pt-[5px] pb-[5px] pl-[20px] pr-[20px] font-bold leading-4 cursor-pointer ml-[10px]"
                            onClick={() => setShowModal(true)}
                            title="Pharmacy Name"
                          >
                            {el?.pharmacy_id?.pharmacy_name}
                          </div>
                        </div>
                      )}

                      <div className="single-prescription-all-medicines-container">
                        {el?.medicines?.map((medicine, idx) => {
                          return (
                            <div className="single-medicine-container">
                              <p className="medicine-counter">
                                Drug {idx + 1}:
                              </p>
                              <div className="medicine-name-container">
                                <p>{medicine?.medicine_id?.medicine_name}</p>
                                <p>{medicine?.instruction}</p>
                              </div>
                              <p>{medicine?.description}</p>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="">
          <div className="">
            <div className="flex justify-center items-center align-center w-[100%]">
              <p className="text-slate-400	text-[20px] text-center text-center font-semibold pt-[5%] pb-[5%]">
                Doctor not recomended any prescription yet!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PrescriptionDetails
