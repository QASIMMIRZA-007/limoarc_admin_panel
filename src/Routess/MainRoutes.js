import React from "react"
import HomeRoutes from "./HomeRoutes"
import { useSelector } from "react-redux"
import AuthRoutes from "./AuthRoutes"


const MainRoutes = () => {
  // const user = useSelector(state => state.auth.adminData)
  const adminToken = useSelector((state => state.auth.adminToken))
  // const loader = useSelector(state => state.general.loader)
  // console.log("loader", loader);
  console.log("ADMINtOKEN", adminToken)



  return (
    <div>
      {/* {loader ? <Loader /> : null} */}

      {adminToken ? <HomeRoutes /> : <AuthRoutes />}
      {/* <HomeRoutes /> */}


      {/* <Boarding /> */}
    </div>
  )
}

export default MainRoutes
