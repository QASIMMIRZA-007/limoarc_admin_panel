// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import "./FAQ.css"
const EditFAQForm = ({ getFAQFun, CloseModel, item }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.adminToken)
  const [data, setData] = useState({ ...item })
  const [selectV, setSelectV] = useState(item?.status)
  console.log("selectV", selectV)
  const SelectVHandler = event => {
    setSelectV(event.target.value)
    console.log(`Selected value ${event.target.value}`)
  }
  // console.log("data", item);
  const handleSubmit = async e => {
    e.preventDefault()

    if (
      data?.question === item?.question &&
      data?.answer === item?.answer &&
      selectV === item?.status
    ) {
      CloseModel()
      return
    }

    dispatch(setLoader(true))
    // CloseModal()
    const formData = {
      question: data?.question,
      answer: data?.answer,
      status: selectV === "true" ? "true" : "false",
    }

    try {
      const res = await ApiCall({
        route: `faqs/update_faq/${item?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status === 200) {
        window.location.reload(true)

        getFAQFun()
        Swal.fire({
          title: "FAQ is updated",
          text: "Successfully",
          timer: 1500,
          showConfirmButton: true,
        })
        // setRender(prev=>prev+1)
        dispatch(setLoader(false))
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga doctor add error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  return (
    <section>
      <div className="w-[100%] h-[400px] flex justify-center items-center">
        <form
          className="w-[100%] "
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              //   ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h2 className="modalHeadings">Edit FAQ</h2>

          <div className="md:px-[0px] px-[10px] mt-[15px] md:flex justify-center">
            <div className=" md:jusify-unset md:mb-[0px] mb-[20px]  justify-around md:block flex mr-3"></div>
            <div className="md:w-[380px] w-[100%] ">
              <Input
                placeholder="Question"
                id="question"
                defaultValue={data?.question}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />

              <>
                <select
                  value={selectV || (data?.status ? "true" : "false")}
                  onChange={SelectVHandler}
                  style={{
                    borderWidth: "1px",
                    borderColor: "#ced4da",
                    marginTop: "10px",
                    width: "100%",
                    height: "42px",
                    borderRadius: "10px",
                    marginBottom: "8px",
                    paddingLeft: "9px",
                  }}
                >
                  {/* <option value="">Status</option> */}
                  <option value="true">Active</option>
                  <option value="false">Disable</option>
                </select>
              </>
              <Input
                type="textarea"
                placeholder="Answer "
                id="answer"
                defaultValue={data?.answer}
                style={{
                  marginTop: "10px",
                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {/* <Input
                placeholder="status"
                id="status"
                defaultValue={data?.status}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              /> */}
              {/* <Input
                placeholder="Email"
                id="email"
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              /> */}
              <div className="float-right">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
                    CloseModel()
                  }}
                  className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Update & Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
export default EditFAQForm
