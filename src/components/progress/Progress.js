import React from "react";
import PropTypes from "prop-types";
import "./Progress.css";

const Progress = ({ done, progress }) => {
  return (
    <>
      <progress
        className="Progress"
        value={done ? "100" : `${progress}`}
        min="0"
        max="100"
      />
    </>
    /* <div className="Flex">
        <div className="ProgressBar">
          <div className="Progress" style={{ width: "75%" }} />
        </div>
        
      </div> */
  );
};
Progress.propTypes = {
  done: PropTypes.bool,
  progress: PropTypes.number
};

export default Progress;
