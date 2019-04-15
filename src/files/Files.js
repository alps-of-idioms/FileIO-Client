import React from "react";
import RenderProgress from "../progress/RenderProgress";
import clear from "./baseline-delete-24px.svg";
import "./Files.css";

const Files = ({ file, uploading, uploadProgress, deleteFile }) => {
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
          onClick={() => deleteFile(file.name)}
        />
        <span className="Filename">{file.name}</span>
      </div>
      <RenderProgress uploadProgress={uploadProgress} uploading={uploading} />
    </div>
  );
};

export default Files;
