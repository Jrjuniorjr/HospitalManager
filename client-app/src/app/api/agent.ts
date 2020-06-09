import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues, IUserItem } from "../models/user";
import { IPaciente } from "../models/paciente";
import { IVaga } from "../models/vaga";
import { INotification } from "../models/notification";

axios.defaults.baseURL = "https://jrjrjrjrjr.herokuapp.com";

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

  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!!!");
  }
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if(error.response.status === 405){
    toast.error("Paciente ainda está alocado a uma vaga!");
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
  listAll: (): Promise<IUserItem[]> => requests.get("/api/user/all"),
};

const Paciente = {
  list: (): Promise<IPaciente[]> => requests.get("/paciente/listar"),
  details: (id: number) => requests.get(`/paciente/consultar/${id}`),
  create: (paciente: IPaciente) =>
    requests.post("/paciente/cadastrar", paciente),
  update: (paciente: IPaciente) => requests.put("/paciente/editar", paciente),
  delete: (id: number) => requests.del(`/paciente/remover/${id}`),
  findByCpf: (cpf: string) => requests.get(`/paciente/pesquisar/${cpf}`),
};

const Vaga = {
  list: (id: number): Promise<IVaga[]> => requests.get(`/vaga/listar/${id}`),
  details: (id: number) => requests.get(`/vaga/consultar/${id}`),
  create: (obj: IVaga) => requests.post("/vaga/cadastrar", obj),
  update: (obj: IVaga) => requests.put("/vaga/editar", obj),
  delete: (id: number) => requests.del(`/vaga/remover/${id}`),
};

const Notification = {
  listEnviados: (id: number): Promise<INotification[]> => requests.get(`/notification/notificacoesEnviadas/${id}`),
  listRecebidos: (id: number): Promise<INotification[]> => requests.get(`/notification/notificacoesRecebidas/${id}`),
  create: (obj: INotification) => requests.post("/notification/notificar", obj),
}

export default {
  User,
  Paciente,
  Vaga,
  Notification,
};
