import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const _axios = axios.create({
  baseURL: REACT_APP_API_URL,
});
