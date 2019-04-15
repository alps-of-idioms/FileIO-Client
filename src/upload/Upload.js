import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import Buttons from "../buttons/Buttons";
import Files from "../files/Files";
import Links from "../links/Links";
import ReactModal from "react-modal";
import "./Upload.css";
import { Provider } from "../fileContext";
import axios from "axios";

function getParent() {
  return document.querySelector("#portal");
}

ReactModal.setAppElement("#root");

export default class Upload extends Component {
  state = {
    files: [],
    uploadedFiles: [],
    links: [],
    uploading: false,
    uploadProgress: {},
    showModal: false
  };

  onFilesAdded = files => {
    let copy = { ...this.state.uploadProgress };
    files.forEach(file => {
      copy[file.name] = {
        state: "preload"
      };
    });

    this.setState(prevState => {
      let filterFiles = files.filter(file => {
        for (let k of prevState.files) {
          return file.name !== k.name;
        }
        return true;
      });
      return {
        files: prevState.files.concat(filterFiles),
        uploadProgress: copy
      };
    });
  };

  clearStateHandler = () => {
    this.setState({
      files: [],
      links: [],
      uploadedFiles: [],
      uploading: false,
      uploadProgress: {}
    });
  };

  uploadFiles = async () => {
    this.setState({
      uploading: true
    });
    const promises = [];
    this.state.files.forEach(file => {
      if (!this.state.uploadedFiles.includes(file)) {
        promises.push(this.sendRequest(file));
      }
    });
    try {
      await axios.all(promises);

      this.setState(prevState => {
        return {
          uploading: false,
          showModal: true
        };
      });
    } catch (e) {
      console.error(e);
      this.setState({ uploading: false });
    }
  };

  sendRequest = file => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return axios
      .request({
        method: "post",
        url: "https://file.io/?expires=1w",
        data: formData,
        withCredentials: false,
        onUploadProgress: event => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };

          this.setState({ uploadProgress: copy });
        }
      })
      .then(response => {
        let link;
        if (response.status === 200) {
          link = response.data.link;
        } else {
          throw new Error(response.status);
        }
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = {
          state: "done",
          percentage: "100"
        };
        this.setState(prevState => {
          return {
            uploadProgress: copy,
            links: prevState.links.concat(link),
            uploadedFiles: prevState.uploadedFiles.concat(file)
          };
        });
      })
      .catch(error => {
        console.error(error, "error");
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
      });
  };

  deleteFile = name => {
    this.setState(prevState => ({
      files: prevState.files.filter(file => file.name !== name)
    }));
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  };

  render() {
    console.log(this.state.files);
    console.log(this.state.links);
    const { files, uploading, links, uploadedFiles } = this.state;

    let fileList = files.map(file => {
      return (
        <Files
          key={(Math.random() * 100).toString(36)}
          file={file}
          uploadProgress={this.state.uploadProgress[file.name]}
          deleteFile={this.deleteFile}
          uploading={this.state.uploading}
        />
      );
    });

    let mapFiles = (files => {
      return files.map(file => {
        return {
          id: Math.random()
            .toFixed(5)
            .toString(36),
          name: file.name,
          size: file.size,
          type: file.type
        };
      });
    })(files);

    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <Provider value={mapFiles}>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
              filesLength={files.length}
            />
          </Provider>
          <div className="Files">{fileList}</div>
        </div>
        <Buttons
          lengthOfFiles={files.length}
          lengthOfUpploaded={uploadedFiles.length}
          lengthOfLinks={links.length}
          uploading={uploading}
          uploadFiles={this.uploadFiles}
          clearStateHandler={this.clearStateHandler}
          getLinks={this.handleOpenModal}
        />
        <aside>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Modal with the links"
            onRequestClose={this.handleCloseModal}
            overlayClassName="ModalOverlay"
            className="ModalWindow"
            parentSelector={getParent}
            ariaHideApp={true}
          >
            <Links links={this.state.links} />
          </ReactModal>
        </aside>
      </div>
    );
  }
}
