import axios from "axios";

export const api = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_URL,
  });
};

export const host = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      token: userData.token,
    },
  });
};
