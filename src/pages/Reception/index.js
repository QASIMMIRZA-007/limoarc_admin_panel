
import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { message, Tabs } from "antd";
import { Link } from "react-router-dom";
import { FaCheck, FaRegEye, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "components/Loader/Loader";
import { BASE_URL } from "Services/Constants";

const AffiliateScreen = () => {
  const [acceptedData, setAcceptedData] = useState({ columns: [], rows: [] });
  const [pendingData, setPendingData] = useState({ columns: [], rows: [] });
  const [rejectedData, setRejectedData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.adminToken);

  const ActionIcons = (chauffeur) => (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Link to={{pathname:`/admin/affiliate-details/${chauffeur?._id}`,state:{chauffeur}}}>
        <FaRegEye />
      </Link>
      <FaCheck
        title="Approve"
        style={{ color: "green", cursor: "pointer" }}
        onClick={() => handleApprove(chauffeur._id)}
      />
      <FaTimes
        title="Reject"
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => handleReject(chauffeur._id)}
      />
    </div>
  );

  const handleApprove = async (chauffeurId) => {
    console.log("chauffeurId", chauffeurId);
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}chauffeur/approve-chauffeur`,
        { chauffeurId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        message.success("Chauffeur approved successfully");
        setPendingData((prevState) => ({
          ...prevState,
          rows: prevState.rows.filter((chauffeur) => chauffeur._id !== chauffeurId),
        }));
        setAcceptedData((prevState) => ({
          ...prevState,
          rows: [
            ...prevState.rows,
            prevState.rows.find((chauffeur) => chauffeur._id === chauffeurId),
          ],
        }));
      }
    } catch (error) {
      console.error("Error approving chauffeur:", error);
      message.error("Error approving chauffeur");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (chauffeurId) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}chauffeur/reject-chauffeur`,
        { chauffeurId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        message.success("Chauffeur rejected successfully");
        setPendingData((prevState) => ({
          ...prevState,
          rows: prevState.rows.filter((chauffeur) => chauffeur._id !== chauffeurId),
        }));
        setRejectedData((prevState) => ({
          ...prevState,
          rows: [
            ...prevState.rows,
            prevState.rows.find((chauffeur) => chauffeur._id === chauffeurId),
          ],
        }));
      }
    } catch (error) {
      console.error("Error rejecting chauffeur:", error);
      message.error("Error rejecting chauffeur");
    } finally {
      setLoading(false);
    }
  };

  const fetchChauffeurs = async (endpoint, setData) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const chauffeurs = res.data.chauffeurs || [];
        setData({
          columns: [
            { label: "First Name", field: "firstName", sort: "asc", width: 150 },
            { label: "Last Name", field: "lastName", sort: "asc", width: 150 },
            { label: "Email", field: "email", sort: "asc", width: 250 },
            { label: "Phone Number", field: "phone", sort: "asc", width: 150 },
            { label: "Country", field: "country", sort: "asc", width: 150 },
            { label: "Actions", field: "actions", sort: "asc", width: 150 },
          ],
          rows: chauffeurs.map((chauffeur) => ({
            firstName: chauffeur.first_name || "-",
            lastName: chauffeur.last_name || "-",
            email: chauffeur.email || "-",
            phone: chauffeur.phone || "N/A",
            country: chauffeur.address?.country || "N/A",
            actions: ActionIcons(chauffeur),
          })),
        });
      }
    } catch (error) {
      console.error("Error fetching chauffeurs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChauffeurs("chauffeur/getAllPendingChauffeurs", setPendingData);
  }, []);

  const handleTabChange = (key) => {
    switch (key) {
      case "1":
        fetchChauffeurs("chauffeur/getAllApprovedChauffeurs", setAcceptedData);
        break;
      case "2":
        fetchChauffeurs("chauffeur/getAllPendingChauffeurs", setPendingData);
        break;
      case "3":
        fetchChauffeurs("chauffeur/getAllRejectedChauffeurs", setRejectedData);
        break;
      default:
        break;
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Accepted Affiliate",
      children: <MDBDataTable responsive noBottomColumns={true} bordered data={acceptedData} />,
    },
    {
      key: "2",
      label: "Pending Affiliate",
      children: <MDBDataTable responsive noBottomColumns={true} bordered data={pendingData} />,
    },
    {
      key: "3",
      label: "Rejected Affiliate",
      children: <MDBDataTable responsive noBottomColumns={true} bordered data={rejectedData} />,
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <h2 className="page-title-dash">Affiliate</h2>
          <Tabs defaultActiveKey="2" items={tabItems} onChange={handleTabChange} />
        </div>
      </div>
    </>
  );
};

export default AffiliateScreen;
