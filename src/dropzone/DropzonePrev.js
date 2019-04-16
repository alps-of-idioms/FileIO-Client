import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import checkFileType from "./checkFileType";
import { Consumer } from "../fileContext";
import "./DropzonePrev.css";
import "./DropzonePrevItemAnimations.css";
import "./DropzonePrevAnimations.css";

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
                timeout={300}
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
