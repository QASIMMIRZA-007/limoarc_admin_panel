// import { Input } from "antd";
import { Input } from "reactstrap"
// Import {Select} from 'an'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UpdateUserProfile } from "../../Redux/Actions/AuthActions"
import userdp from "../../assets/images/user2.png"
import stampdp from "../../assets/images/pharmacy.png"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { ListItem, Select, MenuItem, InputLabel } from "@material-ui/core"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import { object } from "prop-types"
import './FAQ.css'
const FAQForm = ({ getFAQFun, CloseModel }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)
  const [desease, setDesease] = useState([])
  const [getDesease, setGetDesease] = useState([])

  const [deseaseID, setDeseaseID] = useState([])
  const [valueoption, setValueOption] = useState([])
  const [data, setData] = useState({})

  const [render, setRender] = useState(1)
  const [selectV, setSelectV] = useState("");
console.log("selectV",selectV)
  const SelectVHandler = (event) => {
    setSelectV(event.target.value);
    console.log(`Selected value ${event.target.value}`);
  };
  
  const handleSubmit = async e => {
    dispatch(setLoader(true))
    // CloseModal()
    e.preventDefault()
    const formData = {
      question: data?.question,
      answer: data?.answer,
     status: selectV
    }

    try {
      const res = await ApiCall({
        route: "faqs/add_faq",
        token: token,
        verb: "post",
        params: formData,
      })

      if (res?.status === 200) {
        window.location.reload(true)

        CloseModel()
        getFAQFun()
        Swal.fire({
          title: "FAQ is added",
          text: "Successfully",
          timer: 1500,
          showConfirmButton: true
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
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              //   ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h2 className="modalHeadings">Add FAQ</h2>

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
                  value={selectV}
                  onChange={SelectVHandler}
                  style={{
                    borderWidth:'1px', 
                    borderColor:'#ced4da',
                    marginTop: "10px",
                    width:'100%',
                    height: "42px",
                    borderRadius: "10px",
                    marginBottom: "8px",
                    paddingLeft:'9px'
                  }}
                >
                  <option value=''>Status</option>
                  <option value='true'>Active</option>
                  <option value='false'>Disable</option>
               
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
                  
                  }}
                  className="text-gray-50 mt-[35px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
                >
                  Add & Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
export default FAQForm
