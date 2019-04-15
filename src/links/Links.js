import React from "react";
import Tooltip from "../tooltip/Tooltip";
import "./Links.css";

/* const Linkk = ({ link }) => {
  return (
    <div>
      <Link to={link}>{link}</Link>
    </div>
  );
}; */

const Links = ({ links }) => {
  let linksList = links.map(link => {
    return (
      <a
        key={Math.random()
          .toFixed(5)
          .toString(36)}
        href={link}
      >
        {link}
      </a>
    );
  });

  return (
    <div className="ModalContent">
      <Tooltip>
        <button className="Button CopyLinksButton">Copy all links</button>
      </Tooltip>
      <div className="LinksList">{linksList}</div>
    </div>
  );
};

export default Links;
