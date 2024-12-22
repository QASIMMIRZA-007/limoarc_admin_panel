import React from "react";
import { RxArrowTopRight } from "react-icons/rx";
import "./getStartedButton.scss";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const GetStartedButton = ({ title, onClick, isNext, showIcons = true }) => {
  return (
    <div className={`getStateedButtonWrapper`}>
      <button
        onClick={onClick}
        className={`getStartedButton ${
          isNext
            ? "getStateedButtonWrapperNext"
            : "getStateedButtonWrapperPrevious"
        } `}
      >
        {showIcons ? (
          <>
            {isNext ? (
              <>
                {title} <MdNavigateNext />
              </>
            ) : (
              <>
                <GrFormPrevious /> {title}
              </>
            )}
          </>
        ) : (
          title
        )}
      </button>
    </div>
  );
};

export default GetStartedButton;
