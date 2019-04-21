import React from "react";
import "./Buttons.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearState, uploadFiles, openModal } from "../../actions/actions";

const Buttons = ({
  files,
  uploadedFiles,
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
          disabled={uploadedFiles.length === files.length || uploading}
          onClick={() => uploadFiles(files, uploadedFiles)}
        >
          Upload
        </button>

        <button
          className="Button"
          disabled={files.length === 0 || uploading}
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
  files: PropTypes.array,
  lengthOfLinks: PropTypes.number,
  uploading: PropTypes.bool,
  uploadFiles: PropTypes.func,
  clearStateHandler: PropTypes.func,
  getLinks: PropTypes.func
};

const mapStateToProps = ({
  files,
  uploadProgress,
  uploading,
  uploadedFiles,
  links
}) => {
  return {
    files,
    uploadedFiles,
    lengthOfLinks: links.length,
    uploading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearStateHandler: () => {
      dispatch(clearState());
    },
    uploadFiles: (files, uploadedFiles) => {
      dispatch(uploadFiles(files, uploadedFiles));
    },
    getLinks: () => {
      dispatch(openModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buttons);
