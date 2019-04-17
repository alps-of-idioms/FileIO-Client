import img from "./icons/image-24px.svg";
import doc from "./icons/file-24px.svg";
import music from "./icons/music-24px.svg";
import video from "./icons/videocam-24px.svg";
/* import folder from './icons/folder-24px.svg' */

function checkFileType(string) {
  if (!string) return doc;
  let str = string.match(/\w+/)[0];
  switch (str) {
    case "image":
      return img;
    case "video":
      return video;
    case "audio":
      return music;
    default:
      return doc;
  }
}

export default checkFileType;
