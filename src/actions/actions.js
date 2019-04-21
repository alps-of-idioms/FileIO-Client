import {
  FILES_ADDED,
  FILE_REMOVED,
  CLEAR_STATE,
  UPLOAD_START,
  UPLOAD_SUCCESSFUL,
  UPLOAD_FAILED,
  PROGRESS_CHANGED,
  PROGRESS_CHANGED_DONE,
  PROGRESS_CHANGED_FAIL,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../constants";
import axios from "axios";

const filesAdded = files => {
  console.log(files, "ITS ME");
  return {
    type: FILES_ADDED,
    payload: files
  };
};

const fileRemoved = name => {
  return {
    type: FILE_REMOVED,
    payload: name
  };
};

const clearState = () => {
  return {
    type: CLEAR_STATE
  };
};

const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};

const sendRequest = (dispatch, file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  return axios
    .request({
      method: "post",
      url: "https://file.io/?expires=1w",
      data: formData,
      withCredentials: false,
      onUploadProgress: event => {
        dispatch({
          type: PROGRESS_CHANGED,
          payload: {
            fileName: file.name,
            [file.name]: {
              state: "pending",
              percentage: (event.loaded / event.total) * 100
            }
          }
        });
      }
    })
    .then(response => {
      let link;
      if (response.status === 200) {
        link = response.data.link;
      } else {
        throw new Error(response.status);
      }

      dispatch({
        type: PROGRESS_CHANGED_DONE,
        payload: {
          fileName: file.name,
          [file.name]: {
            state: "done",
            percentage: "100"
          },
          link: link,
          uploadedFile: file
        }
      });
    })
    .catch(error => {
      console.error(error, "error");
      dispatch({
        type: PROGRESS_CHANGED_FAIL,
        payload: {
          fileName: file.name,
          [file.name]: {
            state: "error",
            percentage: 0
          }
        }
      });
    });
};

const uploadFiles = (files, uploadedFiles) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPLOAD_START
    });
    const promises = [];
    files.forEach(file => {
      if (!uploadedFiles.includes(file)) {
        promises.push(sendRequest(dispatch, file, uploadedFiles));
      }
    });

    try {
      await axios.all(promises);

      dispatch({
        type: UPLOAD_SUCCESSFUL
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: UPLOAD_FAILED
      });
    }
  };
};

export {
  filesAdded,
  fileRemoved,
  clearState,
  uploadFiles,
  closeModal,
  openModal
};
