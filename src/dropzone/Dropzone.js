import React, { Component } from "react";
import PropTypes from "prop-types";
import DropzonePrev from "./DropzonePrev";
import { CSSTransition /* TransitionGroup */ } from "react-transition-group";
import "./Dropzone.css";
import logo from "./baseline-cloud_upload-24px.svg";

export default class Dropzone extends Component {
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
    /* console.log(files, "файлы"); */
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  };

  openFileDialog = () => {
    if (this.props.disabled) return;
    // console.dir(this.fileInputRef);
    this.fileInputRef.current.click();
  };

  render() {
    //console.dir(this.fileInputRef);
    const { filesLength, disabled } = this.props;
    /* console.log(filesLength, filesLength === 0, "FILES LENGTH"); */
    return (
      <div
        className={`DropzoneContainer ${
          this.state.hightlight ? "Highlight" : ""
        }`}
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
            unmountOnExit
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
