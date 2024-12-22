import React, { useEffect, useState } from "react"
import { Route, Routes, Switch } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Dashboard from "pages/Dashboard"
import PatientScreen from "pages/Patient"
import DoctorScreen from "pages/Doctor"
import ReceptionScreen from "pages/Reception"
import BookingScreen from "pages/Booking"
import PharmaciesScreen from "pages/Pharmacies"
import PaymentScreen from "pages/PaymentHistory"
import MedicalConditionScreen from "pages/MedicalCondition"
import CmsScreen from "pages/CMS/CmsScreen"
import VerticalLayout from "components/VerticalLayout"
import MedicineScreen from "pages/Medicine/MedicineScreen"
import AllergyScreen from "pages/Allergy/AllergyScreen"
// import EditProfileForm from "components/CommonForBoth/TopbarDropdown/EditProfileForm"
import HorizontalLayout from "components/HorizontalLayout"
import EditProfileForm from "components/CommonForBoth/TopbarDropdown/EditProfileForm"
import { useSelector } from "react-redux"
import ContactUsScreen from "pages/ContactUs/ContactUsScreen"
import FAQScreen from "pages/FAQ"
import NotFound from "pages/NotFound/NotFound"
import DetailsPage from "pages/DetailPage/DetailPage"
import Reviews from "pages/Reviews"
import Consent from "pages/Consent"
import MessagingPage from "pages/facultyMessaging/messaging"
import PatientMessagingPage from "pages/patientMessaging/messaging"
import { getToken, onMessage } from "firebase/messaging"
import { ApiCall } from "Services/apis"
import Boarding from "components/Boarding/Boarding"
import ChauffeursScreen from "pages/Pharmacies"
import DynamicDetailsPage from "components/DynamicDetailsPage/DynamicDetailsPage"
import ChaufferDetailsModal from "UI/ChaufferDetailsModel/ChaufferDetailsModal"
import CustomerDetailsModule from "UI/CustomerDetailsModule/CustomerDetailsModule"
import AffiliateScreen from "pages/Reception"
import AffiliateDetailsModule from "UI/AffiliateDetailsModule/AffiliateDetailsModule"

const HomeRoutes = () => {
  const layout = useSelector(state => state.general.layoutType)
  const token = useSelector(state => state?.auth?.adminToken)

  const [retryCount, setRetryCount] = useState(0)

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (layout) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const history = useHistory()
  const location = useLocation()

  
 

  useEffect(() => {
    if (location.pathname === "/admin") {
      history.push("/admin/dashboard")
    }
  }, [location.pathname, history])

  const Layout = getLayout()
  return (
    <>
      <Layout>
        <ToastContainer />
        <Switch>
          <Route
            path="/admin/dashboard"
            render={() => {
              return <Dashboard />
            }}
          />
          <Route
            path="/admin/customers"
            render={() => {
              return <PatientScreen />
            }}
          />
          <Route
            path="/admin/cars"
            render={() => {
              return <DoctorScreen />
            }}
          />
          <Route
            path="/admin/reception"
            render={() => {
              return <ReceptionScreen />
            }}
          />
          <Route
            path="/admin/rides-booking"
            render={() => {
              return <BookingScreen />
            }}
          />
          <Route
            path="/admin/rides-booking-details"
            render={() => {
              return <DynamicDetailsPage />
            }}
          />
          <Route
            path="/admin/chauffeur"
            render={() => {
              return <ChauffeursScreen />
            }}
          />
           <Route
            path="/admin/affiliate"
            render={() => {
              return <AffiliateScreen />
            }}
          />
          <Route
            path="/admin/payment"
            render={() => {
              return <PaymentScreen />
            }}
          />
          <Route
            path="/admin/chauffer-details/:id"
            render={() => {
              return <MedicalConditionScreen />
            }}
          />

          <Route
            path="/admin/messages"
            render={() => {
              return <MessagingPage />
            }}
          />

          <Route
            path="/admin/patient-messages"
            render={() => {
              return <PatientMessagingPage />
            }}
          />

          <Route
            path="/admin/details/:id"
            render={() => {
              return <CustomerDetailsModule />
            }}
          />
           <Route
            path="/admin/chauffeur-details/:id"
            render={() => {
              return <ChaufferDetailsModal />
            }}
          />
           <Route
            path="/admin/affiliate-details/:id"
            render={() => {
              return <AffiliateDetailsModule />
            }}
          />
          <Route
            path="/admin/allergy"
            render={() => {
              return <AllergyScreen />
            }}
          />
          <Route
            path="/admin/contact"
            render={() => {
              return <ContactUsScreen />
            }}
          />
          <Route
            path="/admin/faq"
            render={() => {
              return <FAQScreen />
            }}
          />
          <Route
            path="/admin/cms"
            render={() => {
              return <CmsScreen />
            }}
          />
          <Route
            path="/admin/profile"
            render={() => {
              return <EditProfileForm />
            }}
          />
          <Route
            path="/admin/reviews"
            render={() => {
              return <Reviews /> 
            }}
          />
          <Route
            path="/admin/consent"
            render={() => {
              return <Consent />
            }}
          />
          <Route
            path="/admin/booking-details/:id"
            render={() => {
              return <DetailsPage />
            }}
          />
        </Switch>
      </Layout>
      <Switch>
        <Route
          path="/admin/boarding"
          render={() => {
            return <Boarding />
          }}
        />
      </Switch>
    </>
  )
}

export default HomeRoutes
