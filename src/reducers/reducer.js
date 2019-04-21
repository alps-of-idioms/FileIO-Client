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

const initialState = {
  files: [],
  uploadedFiles: [],
  links: [],
  uploading: false,
  uploadProgress: {},
  showModal: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILES_ADDED:
      let { payload: files } = action;

      const copy = { ...state.uploadProgress };

      files.forEach(file => {
        if (!copy[file.name]) {
          copy[file.name] = {
            state: "preload"
          };
        }
      });

      let filterFiles = files.filter(file => {
        for (let k of state.files) {
          if (file.name === k.name) {
            return false;
          }
        }
        return true;
      });

      return {
        ...state,
        files: state.files.concat(filterFiles),
        uploadProgress: copy
      };

    case FILE_REMOVED:
      const { payload: name } = action;
      return {
        ...state,
        files: state.files.filter(file => file.name !== name)
      };

    case CLEAR_STATE:
      return initialState;

    case UPLOAD_START:
      return {
        ...state,
        uploading: true
      };

    case UPLOAD_SUCCESSFUL:
      return {
        ...state,
        uploading: false,
        showModal: true
      };
    case UPLOAD_FAILED:
      return { ...state, uploading: false };

    case PROGRESS_CHANGED:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.payload.fileName]: action.payload[action.payload.fileName]
        }
      };
    case PROGRESS_CHANGED_DONE:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.payload.fileName]: action.payload[action.payload.fileName]
        },
        links: state.links.concat(action.payload.link),
        uploadedFiles: state.uploadedFiles.concat(action.payload.uploadedFile)
      };
    case PROGRESS_CHANGED_FAIL:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.payload.fileName]: action.payload[action.payload.fileName]
        }
      };
    case OPEN_MODAL:
      return {
        ...state,
        showModal: true
      };

    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default reducer;
