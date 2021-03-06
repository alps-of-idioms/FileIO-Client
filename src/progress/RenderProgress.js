import React from "react";
import checkline from "./baseline-check_circle-24px.svg";
import Progress from "./Progress";
import "./RenderProgress.css";

const RenderProgress = ({ uploadProgress, uploading }) => {
  return (
    <div className="ProgressWrapper">
      <Progress
        progress={uploadProgress ? uploadProgress.percentage : 0}
        done={uploadProgress && uploadProgress.state === "done"}
      />
      <img
        className="CheckIcon"
        alt="done"
        src={checkline}
        style={{
          opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
        }}
      />
    </div>
  );
};

export default RenderProgress;
