import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody } from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import { ApiCall } from "Services/apis"
import { setLoader } from "Redux/Actions/GeneralActions"
import AllergyModal from "common/data/AllergyModal"
import EditAllergyModal from "./EditAllergyModal"
import EditableIcon from "assets/fonts/EditableIcon"
import DeleteIcon from "assets/fonts/DeleteIcon"
import FileIcon from "assets/fonts/FileIcon"
import Swal from "sweetalert2"

const AllergyScreen = () => {
  const ActionIcons = item => (
    <div
      style={{
        display: "flex",
        cursor: "pointer",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div>
        <FileIcon />
      </div> */}
      <div onClick={() => {}}>
        <EditAllergyModal
          buttonLabel={<EditableIcon />}
          getAllAllergy={getAllAllergy}
          editData={item}
        />
      </div>
      <div onClick={() => deleteDoctor(item?._id)}>
        <DeleteIcon />
      </div>
    </div>
  )

  const deleteDoctor = async id => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `allergy/delete_allergy/${id}`,
        token: token,
        verb: "delete",
      })

      if (res?.status === 200) {
        Swal.fire({
          title: "Allergy is Deleted",
          text: "Successfully",
          timer: 1500,
          showConfirmButton: true,
        })
        getAllAllergy()

        dispatch(setLoader(false))
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  const token = useSelector(state => state.auth.adminToken)
  const [data, setData] = useState([])

  const dispatch = useDispatch()
  const getAllAllergy = async () => {
    try {
      const res = await ApiCall({
        route: "allergy/allergy_listing",
        token: token,
        verb: "get",
      })

      if (res?.status === 200) {
        console.log("Res->response", res?.response)
        setData({
          columns: [
            {
              label: "Allergy Name",
              field: "allergy_name",
              sort: "asc",
              width: 150,
            },
            // {
            //   label: "Description",
            //   field: "description",
            //   sort: "asc",
            //   width: 270,
            // },
            {
              label: "Action",
              field: "action",
              sort: "asc",
              width: 270,
            },
          ],
          rows: res?.response?.allergy.map(items => {
            console.log("Allergy--> ", items)
            // const {allergy} = items

            return {
              allergy_name: items?.allergy_name,
              action: ActionIcons(items),
            }
          }),
        })
        // console.log("pharmacies",res?.response?.list)
        dispatch(setLoader(false))
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }
  useEffect(() => {
    dispatch(setLoader(true))
    getAllAllergy()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className=" flex justify-between items-center">
            <div className="w-[100%]">
              <h2 className="page-title-dash">Allergies</h2>
            </div>
            <div className="w-[100%] ">
              <div className="float-end  d-md-block">
                <AllergyModal
                  buttonLabel="Add Allergy"
                  getAllAllergy={getAllAllergy}
                />
              </div>
            </div>
          </div>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable
                    responsive
                    bordered
                    data={data}
                    sortable={false}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AllergyScreen
