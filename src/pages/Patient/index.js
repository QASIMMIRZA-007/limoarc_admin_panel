


import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "Services/Constants";
import Loader from "components/Loader/Loader";
import { setLoader } from "Redux/Actions/GeneralActions";

const PatientScreen = () => {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [conactUsData, setConactUsData] = useState({ columns: [], rows: [] });
  const [statusFilter, setStatusFilter] = useState("all");
  const token = useSelector((state) => state.auth.adminToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const formatCustomerData = (customer) => {
    const { firstName, lastName, phone, email, role, title, _id } = customer;

    return {
      firstName,
      lastName,
      phone: <div>{phone || "---"}</div>,
      email: <div>{email || "---"}</div>,
      role: <div>{role || "---"}</div>,
      title: <div>{title || "---"}</div>,
      action: (

        <Link to={{ pathname: `/admin/details/${_id}`, state: { customer } }}>
        <FaRegEye />
      </Link>
      
      ),
    };
  };

  const getDataFromServer = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}admin/all-customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res && res.status === 200) {
        const customers = res.data.customers;
        setLoading(false)

        const filteredCustomers =
          statusFilter === "all"
            ? customers
            : customers.filter((customer) =>
              statusFilter === "active" ? customer.status === true : customer.status === false
            );

        const formattedData = {
          columns: [
            { label: "Title", field: "title", sort: "asc", width: 100 },
            { label: "First Name", field: "firstName", sort: "asc", width: 150 },
            { label: "Last Name", field: "lastName", sort: "asc", width: 150 },
            { label: "Phone", field: "phone", sort: "asc", width: 150 },
            { label: "Email", field: "email", sort: "asc", width: 200 },
            // { label: "Role", field: "role", sort: "asc", width: 100 },
            { label: "Action", field: "action", sort: "asc", width: 100 },
          ],
          rows: filteredCustomers.map(formatCustomerData),
        };

        setData(formattedData);

      }
    } catch (error) {
      console.error("API Error:", error);


    }
  };

  const fetchContactUsData = async () => {
    try {
      dispatch(setLoader(true));
      const columns = [
        { label: "Name", field: "name", sort: "asc", width: 270 },
        { label: "Email", field: "email", sort: "asc", width: 270 },
        { label: "Message", field: "message", sort: "asc", width: 270 },
      ];
  
      const response = await axios.get(`${BASE_URL}getAllContact`);
      console.log("response", response.data);
  
      if (response.status === 200) {
        console.log("asas", response.data);
        const rows = response.data.map((item) => {
          console.log("item", item);
          const { name, email, message } = item;
  
          return {
            name,
            email: <a href={`mailto:${email}?subject=Reply by Admin`}>{email}</a>,
            message,
          };
        });
  
        setConactUsData({ columns, rows });
      }
    } catch (error) {
      message.error("Failed to load data, Try again later");
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getDataFromServer();
    fetchContactUsData()
  }, [statusFilter]);


  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="page-title-dash mb-2">Customers</h2>
          <FormGroup row>
            <Col style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }} sm={4} lg={4}>
              <Input
                type="select"
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Input>
            </Col>
          </FormGroup>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable responsive bordered data={data} sortable={false} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PatientScreen;

