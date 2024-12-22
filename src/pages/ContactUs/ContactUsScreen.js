import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { setLoader } from "Redux/Actions/GeneralActions";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "Services/Constants";
import { message } from "antd";


const ContactUsScreen = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // const fetchContactUsData = async () => {
  //   try {
  //     dispatch(setLoader(true));
  //     const response = await axios.get(`${BASE_URL}getAllContact`);
  //     console.log("response", response);
      
  //     const rows = response.data.map(({ subject, name, email, description }) => ({
  //       subject,
  //       name,
  //       email: <a href={`mailto:${email}?subject=${title} Reply by Admin`}>{email}</a>,
  //       description,
  //     }));

  //     setData({
  //       columns: [
  //         { label: "Subject", field: "subject", sort: "asc", width: 150 },
  //         { label: "Title", field: "name", sort: "asc", width: 270 },
  //         { label: "Email", field: "email", sort: "asc", width: 270 },
  //         { label: "Description", field: "description", sort: "asc", width: 270 },
  //       ],
  //       rows,
  //     });
  //   } catch (error) {
  //    message.error("Failed to load data", "Try again later", "error");
  //   } finally {
  //     dispatch(setLoader(false));
  //   }
  // };
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
  
        setData({ columns, rows });
      }
    } catch (error) {
      message.error("Failed to load data, Try again later");
    } finally {
      dispatch(setLoader(false));
    }
  };
  
  
  useEffect(() => {
    fetchContactUsData();
    // console.log(data?.rows[0]?.name);
  }, []);

  return (
    <div className="page-content">
      <div className="container-fluid">
        <h2 className="page-title-dash mb-3">Contact Us</h2>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <MDBDataTable noBottomColumns={true} responsive bordered data={data} sortable={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUsScreen;
