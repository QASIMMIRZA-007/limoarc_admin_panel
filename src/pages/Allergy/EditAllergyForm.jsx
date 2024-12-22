import { Input } from "reactstrap"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { setLoader } from "../../Redux/Actions/GeneralActions"
import './allergy.css'

export const EditAllergyForm = ({ role ,item , getAllAllergy,toggle }) => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.adminToken)

  const [data, setData] = useState({...item})


 

  const handleSubmit = async e => {
    e.preventDefault()

    toggle()

    // console.log("first",item)
    dispatch(setLoader(true))


    const formData = new FormData()
    formData.append("allergy_name", data?.allergy_name)
        try {
      const res = await ApiCall({
        route: `allergy/update_allergy/${data?._id}`,
        token: token,
        verb: "put",
        params: formData,
      })

      if (res?.status === 200) {
        getAllAllergy()
        console.log("doc", res?.response)
        Swal.fire({
          title:"Allergy is Updated",
          text:'Successfully',
          timer:1500,
          showConfirmButton:true  
        })
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
      <div className="w-[100%] flex justify-center items-center pt-[20px] pb-[20px]">
        <form
          onChange={({ target: { value, id, files } }) => {
            setData({
              ...data,
              ...(id && { [id]: value }),
              // ...(id === "profile_image" && { [id]: files[0] }),
            })
          }}
        >
          <h3 className="modalHeadings">Edit Allergy </h3>
          <div className="md:px-[0px] px-[10px]  md:flex justify-center ">
            <div className=" md:jusify-unset md:mb-[0px] mb-[20px]  justify-around md:block flex mr-3">
         </div>
            <div className="md:w-[380px] w-[100%] ">
              <Input
                placeholder="Allergy Name"
                id="allergy_name"
                defaultValue={data?.allergy_name}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              {/* <Input
              type="textarea"
                placeholder="Description"
                id="description"
                defaultValue={data?.description}
                style={{
                  marginTop: "10px",

                  height: "42px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              /> */}
            
        
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={e => {
                    handleSubmit(e)
               
                  }}
                  className="text-gray-50 mt-[20px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px] "
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
