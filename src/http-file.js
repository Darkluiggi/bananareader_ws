import axios from "axios";

export default axios.create({
  baseURL: "https://bananareaderaudiobooksms20220506171249.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json",      
  }
});
