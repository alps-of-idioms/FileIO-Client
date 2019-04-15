import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import checkFileType from "./checkFileType";
import { Consumer } from "../fileContext";
import "./DropzonePrev.css";
/* import "./DropzoneAnimations.css"; */
import "./DropzoneA.css";

/* const DropzonePrevItems = ({ name, size, type }) => {
  return (
    <figure className="IconTextWrapper">
      <img src={checkFileType(type)} alt="icon" className="IconImg" />
      <figcaption className="LineWrapper">
        <span className="FileName">{name}</span>
        <span className="FileSize">{(size / 1048576).toFixed(2)}Mb</span>
      </figcaption>
    </figure>
  );
}; */

/* DropzonePrevItems.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string
}; */

const DropzonePrev = () => {
  return (
    <Consumer>
      {files => {
        return (
          <TransitionGroup className="IconContainer">
            {files.map(({ id, type, name, size }) => (
              <CSSTransition
                key={id}
                appear={true}
                timeout={5000}
                classNames="item"
              >
                <figure className="IconTextWrapper">
                  {console.log(id)}
                  <img
                    src={checkFileType(type)}
                    alt="icon"
                    className="IconImg"
                  />
                  <figcaption className="LineWrapper">
                    <span className="FileName">{name}</span>
                    <span className="FileSize">
                      {(size / 1048576).toFixed(2)}Mb
                    </span>
                  </figcaption>
                </figure>
              </CSSTransition>
            ))}
          </TransitionGroup>
        );
      }}
    </Consumer>
  );
};

export default DropzonePrev;
