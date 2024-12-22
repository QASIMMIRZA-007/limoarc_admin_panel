import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { Select, Tabs } from "antd"
import { Steps, Upload, Modal, Button, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import "./customerDetailsModule.scss"
import axios from "axios"
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min"
import { BASE_URL } from "Services/Constants"
import Loader from "components/Loader/Loader"
const { TabPane } = Tabs
import "../ChaufferDetailsModel/newfile.scss"
// import "../chaufferDetailsModel/newDesign.scss"
import { BsChevronDown } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import Apexdonut from "pages/AllCharts/apex/apexdonut1"
import lineareachart from "pages/AllCharts/apex/lineareachart"
import CustomTable from "UI/CustomTable/CustomTable"
import LineChart from "pages/AllCharts/chartjs/linechart"
import DountChart from "pages/AllCharts/chartjs/dountchart"
const CustomerDetailsModule = () => {
  const [currentTab, setCurrentTab] = useState("1")
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.adminData)
  const token = useSelector(state => state.auth.adminToken)
  const history = useHistory()
  const { id } = useParams()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const { Dragger } = Upload

  const steps = [
    { title: "Basic Info" },
    { title: "Booked rides" },
    { title: "Payment History " },
  ]
  const total_earnings_last_year = [
    { month: "Nov 2023", earning: 250000 },
    { month: "Dec 2023", earning: 350000 },
    { month: "Jan 2024", earning: 400000 },
  ]

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const fetchSingleChauffeurData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${BASE_URL}admin/single-chauffeur/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200) {
        setData(res.data.Chauffeur)
        console.log("res", res.data?.Chauffeur)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSingleChauffeurData()
  }, [])
  console.log("data", data)

  const LimoImages = []

  const remainingFields = {
    "paymentDetails.Payment_Method": "",
    "paymentDetails.Payment_Method_email": "",
    "vehicle_detail.brand_model": "",
    "vehicle_detail.color": "",
    "vehicle_detail.manufacture_year": "",
    "vehicle_detail.number_plate": "",
    "vehicle_detail.vin": "",
    "vehicle_detail.vehicle_class": "",
  }
  const handleInputChange = e => {
    console.log("fleds", e.target.value)
  }
  const handleChange = value => {
    console.log(value)
  }
  const dummyDoc =
    "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFzc3BvcnQlMjBkb2N1bWVudHxlbnwwfHwwfHx8MA%3D%3D"
  const userInfo = {
    name: "Irtiza Ali",
    bookingId: "673635b290b19f43e2a7bc1b",
    gender: "Male",
    contactNo: "+1 484 473 1724",
    email: "example@gmail.com",
    paymentStatus: "pending",
    location: "Miami, USA",
    isActive: true,
  }

 
  const fields = [
    {
      label: "Booking ID",
      value: data?._id,
      // formatter: formatLongString,
    },
    { label: "Gender", value: data?.title === "Mr" ? "Male" : "Female" },
    { label: "Contact No", value: data?.phone },
    { label: "Email Address", value: data?.email },
    {
      label: "Payment status",
      value: data?.status,
      isPaymentStatus: true,
    },
    {
      label: "Location",
      value:
        data?.address?.city +
        " " +
        data?.address?.state +
        " " +
        data?.address?.country,
    },
  ]
  const analyticsData = [
    { label: "Total Earnings", value: "0" },
    { label: "Total Income", value: "0" },
    { label: "Total Complains", value: "0" },
    { label: "Average Rating", value: "0" },
    { label: "Refunded Amount", value: "0" },
  ]
  const transactionsColums = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: amount => `$${amount}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: status => (
        <span
          style={{
            color:
              status === "Completed"
                ? "green"
                : status === "Ongoing"
                ? "blue"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
  ]

  const transactionsData = [
    {
      key: "1",
      transactionId: "TXN001",
      paymentDate: "2024-12-21, 10:00 AM",
      paymentAmount: 120,
      paymentMethod: "Credit Card",
      paymentStatus: "Completed",
    },
    {
      key: "2",
      transactionId: "TXN002",
      paymentDate: "2024-12-22, 2:00 PM",
      paymentAmount: 80,
      paymentMethod: "Credit Card",
      paymentStatus: "Upcoming",
    },
    {
      key: "3",
      transactionId: "TXN003",
      paymentDate: "2024-12-20, 5:00 PM",
      paymentAmount: 200,
      paymentMethod: "Credit Card",
      paymentStatus: "Ongoing",
    },
    {
      key: "4",
      transactionId: "TXN004",
      paymentDate: "2024-12-25, 6:00 PM",
      paymentAmount: 140,
      paymentMethod: "Debit Card",
      paymentStatus: "Upcoming",
    },
    {
      key: "5",
      transactionId: "TXN005",
      paymentDate: "2024-12-25, 6:00 PM",
      paymentAmount: 250,
      paymentMethod: "Credit Card",
      paymentStatus: "Upcoming",
    },
    {
      key: "6",
      transactionId: "TXN006",
      paymentDate: "2024-12-25, 6:00 PM",
      paymentAmount: 180,
      paymentMethod: "Debit Card",
      paymentStatus: "Upcoming",
    },
    {
      key: "7",
      transactionId: "TXN007",
      paymentDate: "2024-12-25, 6:00 PM",
      paymentAmount: 400,
      paymentMethod: "Credit Card",
      paymentStatus: "Upcoming",
    },
  ]


  const userName = data?.
  first_name + " " + data?.last_name

  return (
    <section>
      <div className="account-section mt-[20px]">
        <div className="text-[#0D0D0D] text-[24px] mb-[10px] flex justify-center mt-[100px] font-medium">
      
        </div>

        <div className="basic-info">
          <div className="basic-info__header">
            <h1>Basic Information</h1>
            <Select
              className="basic-info__status"
              labelInValue
              defaultValue={{
                value: "Active",
                label: "Active",
              }}
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Active",
                  label: "Active",
                },
                {
                  value: "Inactive",
                  label: "Inactive",
                },
              ]}
            />
          </div>

          <div className="basic-info__profile">
            <div className="basic-info__profile-avatar">
              <FaUser size={24} />
            </div>
          
            <h2 className="basic-info__profile-name">{userName}</h2>
          </div>

          <div className="basic-info__grid">
            {fields.map((field, index) => (
              <div key={index} className="basic-info__field">
                <div className="basic-info__field-label">{field.label}</div>
                <div
                  className={`basic-info__field-value ${
                     field.value === "pending"
                      ? "basic-info__field-value--pending"
                      : ""
                  }`}
                >
                  { field.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pro_mainContainer">
          {loading && <Loader />}
          <div className="BoardingWrapper">
            <div className="overlay" />
            <div className="pro_container_wrapp">
              <Tabs activeKey={currentTab} onChange={setCurrentTab}>
                {steps.map((step, index) => (
                  <TabPane tab={step.title} key={String(index + 1)}>
                    <div className="contentWrapper">
                      {index === 0 && (
                        <div className="stepOneWrapper">
                          <div className="boxsWrapper">
                            {analyticsData?.map(item => {
                              return (
                                <div className="boxs">
                                  <h5>{item?.label}</h5>
                                  <h1>{item?.value}</h1>
                                </div>
                              )
                            })}
                          </div>
                          <div className="graphsWrapper">
                            <div className="graphsWrapp">
                              <div className="graph">
                                <h3>Booked Rides</h3>
                                <LineChart data={total_earnings_last_year} />
                              </div>
                              <div className="graph" >
                            
                                <h3>Ride Distribution</h3>
                             <DountChart  />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                       <CustomTable />
                      )}
                      {index === 2 && (
                        <>
                          <div className="stepOneWrapper">
                          <CustomTable
                          columns={transactionsColums}
                          data={transactionsData}
                        />
                            {/* <div className="inputsGrid">
                              <CustomInput
                                inputTitle="Manufacture Year"
                                name="manufacture_year"
                                onChange={handleInputChange}
                                placeholder="2000"
                                type="text"
                                value={
                                  data?.vehicleDetails?.manufacture_year ||
                                  "N/A"
                                }
                                showStar={true}
                              />

                              <CustomInput
                                inputTitle="Brand & Model"
                                name="brand_model"
                                onChange={handleInputChange}
                                placeholder="Mercedes-Benz S-Class"
                                type="text"
                                value={
                                  data?.vehicleDetails?.brand_model || "N/A"
                                }
                                showStar={true}
                              />

                              <CustomInput
                                inputTitle="Vehicle Class"
                                name="vehicle_class"
                                onChange={handleInputChange}
                                placeholder="Business Class"
                                type="text"
                                value={
                                  data?.vehicleDetails?.vehicle_class || "N/A"
                                }
                                showStar={true}
                              />

                              <CustomInput
                                inputTitle="Vehicle Color"
                                name="color"
                                onChange={handleInputChange}
                                placeholder="Black"
                                type="text"
                                value={data?.vehicleDetails?.color || "N/A"}
                                showStar={true}
                              />

                              <CustomInput
                                inputTitle="License Number Plate"
                                name="number_plate"
                                onChange={handleInputChange}
                                placeholder="License Number Plate *"
                                type="text"
                                value={
                                  data?.vehicleDetails?.number_plate || "N/A"
                                }
                                showStar={true}
                              />

                              <CustomInput
                                inputTitle="Vehicle VIN"
                                name="vin"
                                onChange={handleInputChange}
                                placeholder="Vehicle VIN *"
                                type="text"
                                value={data?.vehicleDetails?.vin || "N/A"}
                                showStar={true}
                              />
                            </div> */}
                          </div>
                        </>
                      )}
                     
                      
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerDetailsModule
