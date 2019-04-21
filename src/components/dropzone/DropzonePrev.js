import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import checkFileType from "../helpers/checkFileType";
import "./DropzonePrev.css";
import "./DropzonePrevItemAnimations.css";
import "./DropzonePrevAnimations.css";

const DropzonePrev = ({ files }) => {
  return (
    <TransitionGroup className="IconContainer">
      {files.map(({ id, type, name, size }) => (
        <CSSTransition key={id} appear={true} timeout={300} classNames="item">
          <figure className="IconTextWrapper">
            {console.log(id)}
            <img src={checkFileType(type)} alt="icon" className="IconImg" />
            <figcaption className="LineWrapper">
              <span className="FileName">{name}</span>
              <span className="FileSize">{(size / 1048576).toFixed(2)}Mb</span>
            </figcaption>
          </figure>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
DropzonePrev.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = ({ files }, ownProps) => {
  return {
    files: files.map(file => {
      return {
        id: file.name,
        name: file.name,
        size: file.size,
        type: file.type
      };
    })
  };
};

export default connect(mapStateToProps)(DropzonePrev);
