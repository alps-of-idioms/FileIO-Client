import React, { Component } from "react";
import "./Progress.css";

export default class Progress extends Component {
  render() {
    console.log("render progress");
    return (
      <>
        <progress
          className="Progress"
          value={this.props.done ? "100" : `${this.props.progress}`}
          min="0"
          max="100"
        />
      </>
      /* <div className="Flex">
        <div className="ProgressBar">
          <div className="Progress" style={{ width: "75%" }} />
        </div>
        
      </div> */
    );
  }
}
