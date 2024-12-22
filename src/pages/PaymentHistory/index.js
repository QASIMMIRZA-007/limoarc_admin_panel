import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Actions/GeneralActions";
import { BASE_URL } from "Services/Constants";
import axios from "axios";

const PaymentScreen = () => {
  const token = useSelector((state) => state.auth.adminToken)
  const dispatch = useDispatch();
  const [data, setData] = useState({
    columns: [
      {
        label: "Transaction ID",
        field: "transaction_id",
        sort: "asc",
        width: 150,
      },
      
      {
        label: "Payment Date",
        field: "payment_date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Payment Amount",
        field: "payment_amount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Payment Method",
        field: "payment_method",
        sort: "asc",
        width: 150,
      },
      {
        label: "Payment Status",
        field: "status",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  });

 

  const getAllPaymentHistory = async () => {
    dispatch(setLoader(true));
    try {
      const res = await axios.get(`${BASE_URL}admin/all-payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const payments = res.data.payments || [];
        const rows = payments.map((payment) => ({
          transaction_id: payment.transactionId || "N/A",
          status: <span style={{ color: payment.status === "received" ? "green" : "red" }}> {payment.status } </span> || "N/A",
          payment_date: new Date(payment.paymentDate).toLocaleDateString(),
          payment_amount: `$${payment.amount || 0}`,
          payment_method: payment.paymentMethod || "Unknown",
        }));
        setData((prevState) => ({ ...prevState, rows }));
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getAllPaymentHistory();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="page-title-dash mb-[10px]">Payments </h2>
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
  );
};

export default PaymentScreen;
