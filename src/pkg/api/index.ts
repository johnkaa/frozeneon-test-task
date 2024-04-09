import axios from "axios";

export default (url = "https://data.jsdelivr.com/v1") => {
  return axios.create({
    baseURL: url,
  });
};