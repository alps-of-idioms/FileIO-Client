import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RenderProgress from "../progress/RenderProgress";
import clear from "./baseline-delete-24px.svg";
import "./Files.css";
import "./FilesAnimations.css";

const File = ({ fileName, uploading, uploadProgress, deleteFile }) => {
  return (
    <div className="Row">
      <div className="StringName">
        <img
          style={{
            cursor: "pointer",
            visibility:
              uploadProgress.state !== "preload" ? "hidden" : "visible"
          }}
          src={clear}
          alt="delete_icon"
          onClick={() => deleteFile(fileName)}
          className="DeleteIcon"
        />
        <span className="Filename">{fileName}</span>
      </div>
      <RenderProgress uploadProgress={uploadProgress} uploading={uploading} />
    </div>
  );
};

const Files = ({ files, uploadProgress, uploading, deleteFile }) => {
  return (
    <TransitionGroup className="Files">
      {files.map(file => {
        return (
          <CSSTransition
            key={file.name}
            appear={true}
            timeout={300}
            classNames="file"
          >
            <File
              key={file.name}
              fileName={file.name}
              uploadProgress={uploadProgress[file.name]}
              uploading={uploading}
              deleteFile={deleteFile}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default Files;
