import React from "react"
import { MDBDataTable } from "mdbreact"

import { Row, Col, Card, CardBody } from "reactstrap"
import { useState } from "react"
import { ApiCall } from "Services/apis"
import { setLoader } from "Redux/Actions/GeneralActions"
import Swal from "sweetalert2"
import { useEffect } from "react"
import AddNewConModal from "common/data/AddNewConModal"
import { connect, useDispatch, useSelector } from "react-redux"
import EditMedicalModal from "pages/MedicalCondition/EditMedicalModal"
import FileIcon from "assets/fonts/FileIcon"
import EditableIcon from "assets/fonts/EditableIcon"
import DeleteIcon from "assets/fonts/DeleteIcon"
import DragableIcon from "assets/fonts/DragableIcon"
import RestoreIcon from "assets/fonts/RestoreIcon"

const MedicalConditionCom = ({ item, refresh }) => {
  // console.log("refresh",refresh)
  const [selectedGroup, setselectedGroup] = useState([])
  const [data, setData] = useState([])
  const [selectedOptionCategory, setSelectedOptionCategory] = useState("active")
  const [archivedlist, setArchivedList] = useState([])

  const token = useSelector(state => state.auth.adminToken)
  const [render, setRender] = useState(1)
  const categoryID = item?.categories?.map(catItem => catItem)
  const dispatch = useDispatch()
  const ActionIcons = item => (
    <div
      style={{
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedOptionCategory == "archived" ? (
        <>
          {/* <div onClick={() => {}}>
        <EditMedicalModal
          buttonLabel={<EditableIcon />}
          getDeseaseConditionFun={getDeseaseConditionFun}
          editData={item}
        />
      </div> */}
          <div onClick={() => RestoreDeseasecategory(item?._id)}>
            <RestoreIcon />
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  )

  const RestoreDeseasecategory = async id => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `desease/update_deleted_category_status/${id}`,
        token: token,
        verb: "put",
      })
      if (res?.status == 200) {
        getDeseaseConditionFun()
        window.location.reload()
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
  const deleteDeseasecategory = async id => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `desease/delete_desease_category/${id}`,
        token: token,
        verb: "put",
      })
      if (res?.status == 200) {
        getDeseaseConditionFun()
        dispatch(setLoader(false))
        window.location.reload()
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }
  const Archivedcategorylist = async id => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `desease/deleted_category_listing/${item?._id}`,
        token: token,
        verb: "get",
      })
      if (res?.status == 200) {
        setArchivedList(res?.response?.list)
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
  // console.log("archivedlist", archivedlist)
  // console.log("data", data)
  const getDeseaseConditionFun = async () => {
    try {
      const res = await ApiCall({
        route: `desease/detail_desease/${item?._id}`,
        token: token,
        verb: "get",
      })
      if (res?.status == 200) {
        setData(res?.response?.desease?.categories)
      } else {
        Swal.fire(res?.response?.message, "Try again", "error")
      }
    } catch (e) {
      console.log(e)
    }
  }
  const DeleteDeseaseConditionFun = async () => {
    try {
      const res = await ApiCall({
        route: `desease/delete_desease/${item?._id}`,
        token: token,
        verb: "delete",
      })
      if (res?.status == 200) {
        window.location.reload()
        dispatch(setLoader(false))
        Swal.fire({
          title: "Desease list is Deleted!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(result => {
          if (result?.dismiss) {
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
  const handleSelectCategory = event => {
    setSelectedOptionCategory(event.target.value)
  }
  useEffect(() => {
    getDeseaseConditionFun()
    Archivedcategorylist()
  }, [refresh, render])
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
              <div className="flex gap-[8px]">
                <h3
                  className="text-[#EB5757] text-xs font-bold cursor-pointer"
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure you want to delete?",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "No",
                      icon: "warning",
                    }).then(result => {
                      if (result.isConfirmed) {
                        DeleteDeseaseConditionFun()
                      }
                    })
                  }
                >
                  Delete Group
                </h3>
                <div className="cursor-poniter">
                  <DragableIcon />
                </div>
              </div>
            </div>
            {selectedGroup == item?._id ? (
              <div>
                <div className="row">
                  <div data-test="datatable-table" className="col-sm-12">
                    <div data-test="table" className="table-responsive">
                      <table
                        entries={10}
                        className="table table-bordered dataTable"
                      >
                        <thead data-test="datatable-head">
                          <tr>
                            <th className> Medical Condition </th>
                            <th className>Overview</th>
                            <th className>Common Symptoms</th>
                            <th className>Treatment</th>
                            <th className>Description</th>
                            <th className>Image</th>
                            <th className>
                              <select
                                className="mainCard"
                                onChange={handleSelectCategory}
                                value={selectedOptionCategory}
                              >
                                <option value="active">Active</option>

                                <option value="archived">Archived</option>
                              </select>
                            </th>
                          </tr>
                        </thead>
                        <tbody data-test="table-body">
                          {selectedOptionCategory == "archived" ? (
                            <>
                              {archivedlist?.length > 0 ? (
                                archivedlist?.map((data, index) => (
                                  <tr>
                                    <td className="flex">
                                      {data?.category_name}
                                    </td>
                                    <td>{data?.overview}</td>
                                    <td>{data?.common_symptoms}</td>
                                    <td>{data?.treatment}</td>
                                    <td>{data?.description}</td>

                                    <td>
                                      <img width={100} src={data?.image} />
                                    </td>
                                    <td>{ActionIcons(data)}</td>
                                  </tr>
                                ))
                              ) : (
                                <div className="text-[#5b626b] ml-[10px] font-medium leading-[30px] outline-none">
                                  No matching records found from archied
                                </div>
                              )}
                            </>
                          ) : data.length > 0 ? (
                            data?.map((item, index) => (
                              <>
                                {item?.isDeleted == false && (
                                  <tr>
                                    <td className="flex">
                                      {item?.category_name}
                                    </td>
                                    <td>{item?.overview}</td>
                                    <td>{item?.common_symptoms}</td>
                                    <td>{item?.treatment}</td>
                                    <td>{item?.description}</td>
                                    <td>
                                      <img width={100} src={item?.image} />
                                    </td>
                                    <td>{ActionIcons(item)}</td>
                                  </tr>
                                )}
                              </>
                            ))
                          ) : (
                            <div className="text-[#5b626b] ml-[10px] font-medium leading-[30px] outline-none">
                              No matching records found
                            </div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <AddNewConModal
                  buttonLabel="+ Add New Condition"
                  item={item}
                  setRender={setRender}
                  getDeseaseConditionFun={getDeseaseConditionFun}
                />
              </div>
            ) : null}
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default MedicalConditionCom
