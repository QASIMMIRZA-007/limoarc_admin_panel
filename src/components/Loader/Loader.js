import React from "react";
import "./Loader.css";

const Loader = ({ height = "100vh", width }) => {
  return (
    <div
      style={{ height, width }}
      className="spinnerContainer  fixed inset-0 z-50 w-full  h-[100vh] "
    >
        <div className="loadingSpinner "></div>
      {/* <div className="loader-box">
      </div> */}
    </div>
  );
};

export default Loader;
