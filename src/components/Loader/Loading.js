import React from "react";
import "./Loader.css";

const Loading = ({ height = "100vh", width }) => {
  return (
    <div
      style={{ height, width }}
      className="spinnerContainer  fixed inset-0  w-full z-20 h-[100vh] "
    >
      <div className="loader-box">
        <div className="Spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
