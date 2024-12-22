


// import React, { useState } from "react";
// import "./login.scss";
// import { ReactSVG } from "react-svg";
// import { Col, message, Row } from "antd";
// import { MdEmail } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { IoEyeOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { emailIcon, logo, passwordIcon } from "assets/IndexSvgs";
// import CustomInput from "UI/CustomInput/CustomInput";
// import FormsButton from "UI/FormsButton/FormsButton";
// import CustomCheckbox from "UI/CustomCheckbox/CustomCheckbox";
// import { loginRequest } from "Redux/Actions/AuthActions";
// import { setLoader } from "Redux/Actions/GeneralActions";
// import Loader from "components/Loader/Loader";

// const Login = () => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [validations, setValidations] = useState({
//     password: true,
//     email: true,
//   })
//   const [loading, setLoading] = useState(false);
//   console.log("isLoading", loading)
//   const [showError, setShowError] = useState(false)
//   const dispatch = useDispatch();
//   const history = useHistory()
//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };


//   const data = { email, password };
//   // const handleSubmit = () => {
//   //   setLoading(true)
//   //   if (
//   //     !email.includes("@") ||
//   //     email.trim().length === 0 ||
//   //     password.trim().length === 0
//   //   ) {
//   //     setValidations({
//   //       password: password.trim().length > 0,
//   //       email: email.includes("@") && email.trim().length > 0,
//   //     });
//   //     setShowError(true);
//   //     return;
//   //   }

//   //   dispatch(setLoader(true));
//   //   setLoading(true)
//   //   dispatch(loginRequest(data, history));
//   //   setLoading(false)
//   // };

//   return (
//     <>
//       {loading && <Loader />}
//       <div className="loginFormWrapper">
//         <div className="loginFormWrapp">
//           <div className="bgWrapp">
//             <div className="background" />
//             <div className="overlay" />
//           </div>
//           <div className="formWrapper">
//             <div className="formWrapp">
//               <div className="logoWrapp">
//                 <div className="logo">
//                   <ReactSVG src={logo} />{" "}
//                 </div>
//               </div>
//               <div className="formHeader">
//                 <h1>Welcome back</h1>
//               </div>
//               <form className="form">
//                 <CustomInput
//                   svg={emailIcon}
//                   placeholder="Email"
//                   passSvg={null}
//                   type="email"
//                   value={email}
//                   showStar={false}
//                   inputStyle={{ color: "#fff" }}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <CustomInput
//                   inputStyle={{ color: "#fff" }}
//                   showStar={false}
//                   svg={passwordIcon}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   passSvg={
//                     isPasswordVisible ? <IoEyeOutline style={{ color: "#fff" }} /> : <FaRegEyeSlash style={{ color: "#fff" }} />
//                   }
//                   type={isPasswordVisible ? "text" : "password"}
//                   onClick={togglePasswordVisibility}
//                 />
//                 <div className="lowerContainer">
//                   <CustomCheckbox text="Remmember me" />

//                 </div>

//                 <FormsButton
//                   // title={isLoading ? "Logging in..." : "Login"}
//                   title={"Login"}
//                   handleClick={(e) => {
//                     e.preventDefault()
//                     handleSubmit(e)
//                   }}
//                 />


//               </form>
//               {/* <div className="buttonWrapper">
//                 <div className="buttonWrapp">
//                   <div className="btn">
//                     <ReactSVG src={google} />
//                     <button>Sign in with Google</button>
//                   </div>
//                   <div className="btn">
//                     <ReactSVG src={apple_Vector} />
//                     <button>Sign in with APPLE</button>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


// export default Login;


import React, { useState } from "react";
import "./login.scss";
import { ReactSVG } from "react-svg";
import { Col, message, Row } from "antd";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { emailIcon, logo, passwordIcon } from "assets/IndexSvgs";
import CustomInput from "UI/CustomInput/CustomInput";
import FormsButton from "UI/FormsButton/FormsButton";
import CustomCheckbox from "UI/CustomCheckbox/CustomCheckbox";
import { loginRequest } from "Redux/Actions/AuthActions";
import { setLoader } from "Redux/Actions/GeneralActions";
import Loader from "components/Loader/Loader";
import Swal from "sweetalert2";  // Import SweetAlert

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({
    password: true,
    email: true,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const data = { email, password };

  const handleSubmit = () => {
    if (!email.includes("@") || email.trim().length === 0 || password.trim().length === 0) {
      setValidations({
        password: password.trim().length > 0,
        email: email.includes("@") && email.trim().length > 0,
      });
      message.warning("Please ensure all fields are completed correctly before proceeding.");



      // Swal.fire({
      //   title: "Error!",
      //   text: "Please fill in all fields correctly.",
      //   icon: "error",
      //   confirmButtonText: "Ok",
      // });

      return; // Prevent API call if fields are empty
    }

    dispatch(setLoader(true));
    setLoading(true);
    dispatch(loginRequest(data, history));
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="loginFormWrapper">
        <div className="loginFormWrapp">
          <div className="bgWrapp">
            <div className="background" />
            <div className="overlay" />
          </div>
          <div className="formWrapper">
            <div className="formWrapp">
              <div className="logoWrapp">
                <div className="logo">
                  <ReactSVG src={logo} />{" "}
                </div>
              </div>
              <div className="formHeader">
                <h1>Welcome back</h1>
              </div>
              <form className="form">
                <CustomInput
                  svg={emailIcon}
                  placeholder="Email"
                  passSvg={null}
                  type="email"
                  value={email}
                  showStar={false}
                  inputStyle={{ color: "#fff" }}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CustomInput
                  inputStyle={{ color: "#fff" }}
                  showStar={false}
                  svg={passwordIcon}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  passSvg={
                    isPasswordVisible ? <IoEyeOutline style={{ color: "#fff" }} /> : <FaRegEyeSlash style={{ color: "#fff" }} />
                  }
                  type={isPasswordVisible ? "text" : "password"}
                  onClick={togglePasswordVisibility}
                />
                <div className="lowerContainer">
                  <CustomCheckbox text="Remember me" />
                </div>

                <FormsButton
                  title={"Login"}
                  handleClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
