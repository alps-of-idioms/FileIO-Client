import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./baseline-cloud_upload-24px.svg";
import DropzonePrev from "./DropzonePrev";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import "./Dropzone.css";
import classNames from "classnames";
import { filesAdded } from "../../actions/actions";

class Dropzone extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onFilesAdded: PropTypes.func,
    filesLength: PropTypes.number
  };
  fileInputRef = React.createRef();

  state = {
    hightlight: false
  };

  onDragOver = e => {
    e.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  };

  onDragLeave = e => {
    e.preventDefault();
    this.setState({ hightlight: false });
  };

  onDrop = e => {
    e.preventDefault();

    if (this.props.disabled) return;
    const files = e.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  };

  fileListToArray(list) {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  onFilesAdded = e => {
    if (this.props.disabled) return;
    const files = e.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  };

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  };

  render() {
    const { filesLength, disabled } = this.props;
    const { hightlight } = this.state;
    const classes = classNames({
      DropzoneContainer: true,
      Highlight: hightlight
    });
    return (
      <div
        className={classes}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        {filesLength > 0 ? (
          <DropzonePrev />
        ) : (
          <CSSTransition
            timeout={2000}
            in={filesLength === 0}
            appear={filesLength === 0}
            classNames="item-wrapper"
          >
            <div className="Dropzone">
              <img src={logo} className="Icon" alt="upload" />
              <span className="Text">
                Click on the area or Drag'n-Drop your file to the area
              </span>
            </div>
          </CSSTransition>
        )}
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
      </div>
    );
  }
}

const mapStateToProps = (
  { files, uploading, successfullUploaded },
  ownProps
) => {
  return {
    filesLength: files.length,
    disabled: uploading || successfullUploaded
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilesAdded: files => {
      dispatch(filesAdded(files));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropzone);
