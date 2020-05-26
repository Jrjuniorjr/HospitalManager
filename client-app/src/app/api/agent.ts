import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IPaciente } from "../models/paciente";
import { IVaga } from "../models/vaga";

//axios.defaults.baseURL = "https://jrjrjrjrjr.herokuapp.com";
axios.defaults.baseURL = "https://crud-paciente.herokuapp.com";

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
    requests.post("/api/auth/signin", user),
  register: (user: IUserFormValues) => requests.post("/api/auth/signup", user),
};

const Paciente = {
  list: (id: number): Promise<IPaciente[]> =>
    requests.get(`/paciente/listarPacientes/${id}`),
  details: (id: number) => requests.get(`/paciente/consultarPaciente/${id}`),
  create: (paciente: IPaciente) =>
    requests.post("/paciente/cadastrarPaciente", paciente),
  update: (paciente: IPaciente) =>
    requests.put("/paciente/editarPaciente", paciente),
  delete: (id: number) => requests.del(`/paciente/removerPaciente/${id}`),
};

const Vaga = {
  list: (): Promise<IVaga[]> => requests.get("/vaga/listar"),
  details: (id: number) => requests.get(`/vaga/consultar${id}`),
  create: (obj: IVaga) => requests.post("/vaga/cadastrar", obj),
  update: (obj: IVaga) => requests.put("/vaga/editar", obj),
  delete: (id: number) => requests.del(`/vaga/remover/${id}`),
};

export default {
  User,
  Paciente,
  Vaga,
};
