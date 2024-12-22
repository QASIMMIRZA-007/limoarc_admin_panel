





import PropTypes from "prop-types"
import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Link } from "react-router-dom"

// Custom Scrollbar
import SimpleBar from "simplebar-react"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"
import servicesIcon4 from "../../assets/images/services-icon/04.png"
import user2 from "../../assets/images/user2.png"

// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart"
import RadialChart from "../AllCharts/apex/apexdonut"
import Apexdonut from "../AllCharts/apex/apexdonut1"
import SparkLine from "../AllCharts/sparkline/sparkline"
import SparkLine1 from "../AllCharts/sparkline/sparkline1"
import Salesdonut from "../AllCharts/apex/salesdonut"

import "chartist/dist/scss/chartist.scss"

//i18n
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { setLoader } from "Redux/Actions/GeneralActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { ApiCall } from "Services/apis"
import Attention from "components/Attention"

import "./dashboard.scss"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import axios from "axios"
import { BASE_URL } from "Services/Constants"

const Dashboard = props => {
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [clientReviews, setClientReviews] = useState([])
  const [menu, setMenu] = useState(false)
  const token = useSelector(state => state.auth.adminToken)
  const loader = useSelector(state => state.general.loader)
  // const token = null;
  // console.log("loder",loader)
  const toggle = () => {
    setMenu(!menu)
  }





  const getDashboardCardData = async () => {
    try {
      console.log("Token being sent:", token); // Debug the token
  
      const res = await axios.get(`${BASE_URL}admin/getAdminDashboardData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res?.status === 200) {
        dispatch(setLoader(false));
        setData(res?.data?.dashboardData)
        console.log("Response Data:", res?.data); // Correctly log response data
      } else {
        Swal.fire(`${res?.data?.message || "Error occurred"}`, "Try again", "error");
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.error("Request Error:", error?.response || error?.message);
      dispatch(setLoader(false));
    }
  };
  
  useEffect(() => {
    getDashboardCardData();
  }, []);
  
 




  const getClientReviews = async () => {
    try {
      const res = await ApiCall({
        route: `review/latest_review_listing`,
        token: token,
        verb: "get",
      })
      if (res?.status == 200) {
        dispatch(setLoader(false))
        setClientReviews(res?.response?.list)
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (error) {
      console.log("saga login error -- ", error.toString())
      dispatch(setLoader(false))
    }
  }




  const total_earnings_last_year = [
    { month: "Nov 2023", earning: 250000 },
    { month: "Dec 2023", earning: 350000 },
    { month: "Jan 2024", earning: 400000 }
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          {/* <title>Dashboard | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title> */}
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    Welcome to Limoarc Chauffer Portal
                  </li>
                </ol>
              </Col>

              <Col md="4">
                <div className="float-end d-none d-md-block">
                  <Dropdown isOpen={menu} toggle={toggle}>
      
                    <DropdownMenu right>
                      <DropdownItem tag="a" href="#">
                        Action
                      </DropdownItem>
                      <DropdownItem tag="a" href="#">
                        Another action
                      </DropdownItem>
                      <DropdownItem tag="a" href="#">
                        Something else here
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag="a" href="#">
                        Separated link
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody className="card-body-dashboard-blue-cards">
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4 flex justify-center items-center">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Customer{" "}
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {data?.totalCustomers || "0"}
                      {/* <i className="mdi mdi-arrow-up text-success ms-2"></i> */}
                    </h4>
                    {/* <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div> */}
                  </div>
                  <div className="pt-2 ">
                    <div className="float-end ">
                      <Link to="/admin/customers" className="text-white-50 ">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody className="card-body-dashboard-blue-cards">
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4 flex justify-center items-center">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Chauffeurs
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {data?.totalChauffeurs || "0"}

                      {/* <i className="mdi mdi-arrow-up text-success ms-2"></i> */}
                    </h4>
                    {/* <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div> */}
                  </div>
                  <div className="pt-2 ">
                    <div className="float-end ">
                      <Link to="/admin/customers" className="text-white-50 ">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4 flex justify-center items-center">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Income
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {Math.floor(data?.totalIncome) || "0"}
                      {/* <i className="mdi mdi-arrow-down text-danger ms-2"></i> */}
                    </h4>
                    {/* <div className="mini-stat-label bg-danger">
                      <p className="mb-0">- 28%</p>
                    </div> */}
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="/admin/payment" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4 flex justify-center items-center flex justify-center items-center">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Rides
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {data?.totalRides || 0}
                      {/* <i className="mdi mdi-arrow-up text-success ms-2"></i> */}
                    </h4>
                    {/* <div className="mini-stat-label bg-info">
                      <p className="mb-0"> 00%</p>
                    </div> */}
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="/admin/rides-booking" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

          </Row>

          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Attention data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={9}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Monthly Earning</h4>
                  <Row>
                    <Col lg={7}>
                      <div>
                        <LineAreaChart data={total_earnings_last_year} />
                      </div>
                    </Col>
                    <Col lg={5}>
                      <Row style={{ height: "100%", alignItems: "center" }}>
                        <Col md={6}>
                          <div className="text-center">
                            <p className="text-muted mb-4">This month</p>
                            <h3>$0</h3>
                            <p className="text-muted mb-5">
                              Total amount this month till today
                            </p>
                            {/* seriesData={data?.response?.this_month_income} */}
                            {/* {loader ? null : (
                              <RadialChart
                                seriesData={data?.this_month_income}
                              />
                            )} */}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="text-center">
                            <p className="text-muted mb-4">Last month</p>
                            <h3>$0</h3>
                            <p className="text-muted mb-5">
                              Total amount collected in last month
                            </p>
                            {/* {loader ? null : (
                              <Apexdonut
                                seriesData={data?.previous_month_income}
                              />
                            )} */}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3}>
              <Card>
                <CardBody>
                  <div>
                    <h4 className="card-title mb-4">Rides Analytics</h4>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Hourly Ride Service</p>
                          <h5 className="mb-4">0</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Chauffuer Service</p>
                          <h5 className="mb-4">0</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine1 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Limousine Service</p>
                          <h5>0</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)

