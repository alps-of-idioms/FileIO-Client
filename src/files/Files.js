import React from "react";
import RenderProgress from "../progress/RenderProgress";
import clear from "./baseline-delete-24px.svg";
import "./Files.css";

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
        />
        <span className="Filename">{fileName}</span>
      </div>
      <RenderProgress uploadProgress={uploadProgress} uploading={uploading} />
    </div>
  );
};

const Files = ({ files, uploadProgress, uploading, deleteFile }) => {
  return (
    <div className="Files">
      {files.map(file => {
        return (
          <File
            key={file.name}
            fileName={file.name}
            uploadProgress={uploadProgress[file.name]}
            uploading={uploading}
            deleteFile={deleteFile}
          />
        );
      })}
    </div>
  );
};

export default Files;
