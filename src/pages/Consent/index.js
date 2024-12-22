import TextEditor from "components/Common/TextEditor"
import React, { useEffect } from "react"
import "./Consent.css"
import { useState } from "react"
import { ApiCall } from "Services/apis"
import { setLoader } from "Redux/Actions/GeneralActions"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"

const Consent = () => {
  const [content, setContent] = useState(null)
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.adminToken)

  const onChange = data => {
    setContent(data)
    console.log(data)
  }

  useEffect(() => {
    const getConsent = async () => {
      try {
        const res = await ApiCall({
          route: `documents/get_document/Consent`,
          verb: "get",
          token: token,
          params: {},
        })
        if (res?.status === 200) {
          setContent(res?.response?.document?.content)
        }
      } catch (error) { }
    }
    getConsent()
  }, [])

  const submit = async () => {
    try {
      const res = await ApiCall({
        route: `documents/update_document`,
        token: token,
        verb: "post",
        params: { name: "Consent", content },
      })

      if (res?.status === 200) {
        Swal.fire({
          title: "Consent updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
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
    <div className="page-content">
      <div className="container-fluid">
        <h2 className="page-title-dash mb-[10px]">Consent</h2>
        <div className="consent-main-div">
          <TextEditor content={content} setContent={setContent} />
        </div>
        <button
          // onClick={submit}
          type="submit"
          className="text-gray-50 mt-[25px] text-[15px]  md:mb-[0px] mb-[15px] w-[173px] h-[45px] bg-[#a18552] rounded-[10px]"
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default Consent
