import React from "react"
import { MDBDataTable } from "mdbreact"

import { Row, Col, Card, CardBody } from "reactstrap"
import { useState } from "react"
import { ApiCall } from "Services/apis"
import { setLoader } from "Redux/Actions/GeneralActions"
import Swal from "sweetalert2"
import { useEffect } from "react"
import AddNewConModal from "common/data/AddNewConModal"
import { useDispatch, useSelector } from "react-redux"
import EditMedicalModal from "pages/MedicalCondition/EditMedicalModal"
import FileIcon from "assets/fonts/FileIcon"
import EditableIcon from "assets/fonts/EditableIcon"
import DeleteIcon from "assets/fonts/DeleteIcon"

// import { icon } from "leaflet"
// import { text } from "stream/consumers"

const FAQComponent = ({ item, getDeseaseFun }) => {
  const [render, setRender] = useState(1)
  const dispatch = useDispatch()
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
        <EditMedicalModal
          buttonLabel={<EditableIcon />}
          getDeseaseConditionFun={getDeseaseConditionFun}
          editData={item}
        />
      </div>
      <div onClick={() => deleteDeseasecategory(item?._id)}>
        <DeleteIcon />
      </div>
    </div>
  )

  const deleteDeseasecategory = async id => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `desease/delete_desease_category/${id}`,
        token: token,
        verb: "put",
      })
      // console.log("first",item)
      if (res?.status === 200) {
        Swal.fire({
          title: "Deleted..",
          text: "Desease removed ",
          timer: 2000,
          showConfirmButton: true,
        })
        setRender(prev => prev + 1)
        dispatch(setLoader(false))
        getDeseaseFun()
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }
  const [selectedGroup, setselectedGroup] = useState([])

  const [data, setData] = useState([])
  const token = useSelector(state => state.auth.adminToken)

  const getDeseaseConditionFun = async () => {
    try {
      const res = await ApiCall({
        route: `desease/detail_desease/${item?._id}`,
        token: token,
        verb: "get",
      })

      if (res?.status == "200") {
        setData({
          columns: [
            {
              label: " Medical Condition ",
              field: "category_name",
              sort: "asc",
              width: 150,
            },
            {
              label: "Common Symptoms",
              field: "common_symptoms",
              sort: "asc",
              width: 270,
            },
            {
              label: "Description",
              field: "description",
              sort: "asc",
              width: 200,
            },

            {
              label: "Overview",
              field: "overview",
              sort: "asc",
              width: 150,
            },
            {
              label: "Treatment",
              field: "treatment",
              sort: "asc",
              width: 150,
            },
            {
              label: "Image",
              field: "image",
              sort: "asc",
              width: 150,
            },
            {
              label: "Action",
              field: "action",
              sort: "asc",
              width: 150,
            },
          ],
          rows: res?.response?.desease?.categories.map(item => {
            const {
              category_name,
              common_symptoms,
              description,
              overview,
              treatment,
              image,
            } = item
            console.log("itemss-->", item)

            return {
              category_name,
              common_symptoms,
              description,
              overview,
              treatment,
              image,
              action: ActionIcons(item),
            }
          }),
        })
      } else {
        Swal.fire(res?.response?.message, "Try again", "error")
      }
    } catch (e) {
      console.log(e)
      // Swal.fire(e?.response?.message, "Try again", "error")
    }
  }

  const DeleteDeseaseConditionFun = async () => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `desease/delete_desease/${item?._id}`,
        token: token,
        verb: "delete",
      })
      if (res?.status == 200) {
        getDeseaseFun()
        Swal.fire({
          title: "Desease list is Deleted!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(result => {
          if (result?.dismiss) {
            // setRender(prev => prev + 1)
          }
        })
      } else {
        dispatch(setLoader(false))
        Swal.fire(`${res?.response?.message}`, "Try again", "error")
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getDeseaseConditionFun()
  }, [render])

  return (
    <Row>
      <Col className="col-12">
        <Card>
          <CardBody>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => {
                selectedGroup == item?._id
                  ? setselectedGroup(null)
                  : setselectedGroup(item?._id)
              }}
            >
              <div>
                <h2 className="text-[#0D0D0D] text-sm font-bold">
                  {item?.desease_name + " "}
                  {selectedGroup == item?._id ? (
                    <i
                      class="fa fa-angle-down text-[#828282]"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i
                      class="fa fa-angle-right text-[#828282]"
                      aria-hidden="true"
                    ></i>
                  )}
                </h2>
              </div>
              <div>
                <h3
                  className="text-[#EB5757] text-xs font-bold cursor-pointer"
                  onClick={() => {
                    DeleteDeseaseConditionFun()
                    console.log(selectedGroup)
                  }}
                >
                  Delete Group
                </h3>
              </div>
            </div>
            {selectedGroup == item?._id ? (
              <div>
                <MDBDataTable
                  responsive
                  bordered
                  data={data}
                  searching={false}
                  paging={false}
                  sortable={false}
                />
                <AddNewConModal
                  buttonLabel="+ Add New Condition"
                  item={item}
                  setRender={setRender}
                />
              </div>
            ) : null}
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default FAQComponent
