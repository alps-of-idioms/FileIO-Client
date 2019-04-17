import React from "react";
import "./Buttons.css";
import PropTypes from "prop-types";

const Buttons = ({
  lengthOfFiles,
  lengthOfUpploaded,
  lengthOfLinks,
  uploading,
  uploadFiles,
  clearStateHandler,
  getLinks
}) => {
  return (
    <div className="Actions">
      <div className="Flex">
        <button
          className="Button"
          disabled={lengthOfUpploaded === lengthOfFiles || uploading}
          onClick={uploadFiles}
        >
          Upload
        </button>

        <button
          className="Button"
          disabled={lengthOfFiles === 0 || uploading}
          onClick={clearStateHandler}
        >
          Clear
        </button>
        <button
          className="Button"
          disabled={lengthOfLinks === 0}
          onClick={getLinks}
        >
          Get Links
        </button>
      </div>
    </div>
  );
};
Buttons.propTypes = {
  lengthOfFiles: PropTypes.number,
  lengthOfUpploaded: PropTypes.number,
  lengthOfLinks: PropTypes.number,
  uploading: PropTypes.bool,
  uploadFiles: PropTypes.func,
  clearStateHandler: PropTypes.func,
  getLinks: PropTypes.func
};

export default Buttons;
