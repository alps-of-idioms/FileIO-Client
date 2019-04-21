import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropzone from "../dropzone/Dropzone";
import Buttons from "../buttons/Buttons";
import Files from "../files/Files";
import Links from "../links/Links";
import ReactModal from "react-modal";
import { closeModal } from "../../actions/actions";
import "./Upload.css";

function getParent() {
  return document.querySelector("#portal");
}

ReactModal.setAppElement("#root");

const Upload = ({ files, showModal, closeModal }) => {
  return (
    <div className="Upload">
      <span className="Title">Upload Files</span>
      <div className="Content">
        <Dropzone />
        <Files />
      </div>
      <Buttons />
      <aside>
        <ReactModal
          isOpen={showModal}
          contentLabel="Modal with the links"
          onRequestClose={closeModal}
          overlayClassName="ModalOverlay"
          className="ModalWindow"
          parentSelector={getParent}
          ariaHideApp={true}
        >
          <Links />
        </ReactModal>
      </aside>
    </div>
  );
};
Upload.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.bool,
  closeModal: PropTypes.func
};

const mapStateToProps = ({ files, uploadProgress, showModal }, ownProps) => {
  return {
    files,
    uploadProgress,
    showModal
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ closeModal }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
