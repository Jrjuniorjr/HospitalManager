import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) =>{
  const token = window.localStorage.getItem("jwt");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
  
  if(error.message === "Network Error" && !error.response){
    toast.error("Network error - make sure API is running!!!");
}
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (
    error.response.status === 400 &&
    error.response.config.method === "get" &&
    error.response.data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if(error.response.status === 500){
      toast.error("Server error - check the terminal for more info!")
  }
  throw error.response;
});

const responseBody = (responseBody: AxiosResponse) => responseBody.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`activities/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> => requests.post("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post("/user/register", user),
  
}

export default {
  Activities,
  User
};
