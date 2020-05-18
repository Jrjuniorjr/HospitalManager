import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "https://jrjrjrjrjr.herokuapp.com/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  console.log(error.response);

  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!!!");
  }
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  
  if (error.response.status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (responseBody: AxiosResponse) => responseBody.data;


const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};


const User = {
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post("/auth/signin", user),
  register: (user: IUserFormValues) =>
    requests.post("/auth/signup", user),
};

export default {
  User,
};
