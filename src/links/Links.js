import React from "react";
import Tooltip from "../tooltip/Tooltip";
import "./Links.css";

export default class Links extends React.Component {
  state = {
    isCopied: false
  };

  copyAllLinks = links => {
    let copyText = links.reduce((acc, item) => {
      return acc + item + "\n";
    }, "");
    navigator.clipboard.writeText(copyText);
    this.setState({
      isCopied: true
    });
  };

  render() {
    const { links } = this.props;
    const { isCopied } = this.state;

    return (
      <div className="ModalContent">
        <Tooltip
          content={isCopied ? "Links copied" : "Copy all links to clipboard"}
        >
          <button
            className="Button CopyLinksButton"
            onClick={() => this.copyAllLinks(links)}
          >
            Copy all links
          </button>
        </Tooltip>
        <div className="LinksList">
          {links.map(link => {
            return (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="Link"
              >
                {link}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
