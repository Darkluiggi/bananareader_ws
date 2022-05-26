import axios from "axios";

export default axios.create({
  baseURL: "https://bananareader-metadata-ms-wmmoxiqqva-tl.a.run.app/",
  headers: {
    "Content-type": "application/json",      
  }
});
