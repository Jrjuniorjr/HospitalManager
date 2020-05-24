import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { IPaciente } from "../models/paciente";
import { history } from "../..";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";
import { IUser } from "../models/user";

export default class PacienteStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loadingInitial = false;
  @observable pacienteRegistry = new Map();
  @observable paciente: IPaciente | null = null;
  @observable loading = false;
  @observable submitting = false;

  @action setLoading = (flag: boolean) => {
    this.loading = flag;
  };
  @action loadPacientes = async () => {
    this.loadingInitial = true;
    this.pacienteRegistry = new Map();
    try {
      const pacientes = await agent.Paciente.list(
        parseInt(window.localStorage.getItem("id")!)
      );
      runInAction("loading pacientes", () => {
        pacientes.forEach((paciente) => {
          this.pacienteRegistry.set(paciente.id, paciente);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load pacientes error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadPaciente = async (id: number) => {
    this.loadingInitial = true;
    try {
      let paciente = await agent.Paciente.details(id);
      runInAction("getting paciente", () => {
        this.paciente = paciente;
        this.pacienteRegistry.set(paciente.id, paciente);
        this.loadingInitial = false;
      });
      return paciente;
    } catch (error) {
      runInAction("get paciente error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createPaciente = async (paciente: IPaciente) => {
    this.submitting = true;
    try {
      let userTemp: IUser = {
        token: "",
        type: "",
        id: parseInt(window.localStorage.getItem("id")!),
        username: "",
        email: "",
        roles: []
      };
      let pacienteTemp = {
        ...paciente,
        user: userTemp
      };
      await agent.Paciente.create(pacienteTemp);
      runInAction("creating paciente", () => {
        this.submitting = false;
      });
      history.push("/pacienteDashboard");
    } catch (error) {
      runInAction("create paciente error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action editPaciente = async (paciente: IPaciente) => {
    this.submitting = true;
    try {
      await agent.Paciente.update(paciente);
      runInAction("editing paciente", () => {
        this.submitting = false;
      });
      history.push("/pacienteDashboard");
    } catch (error) {
      runInAction("edit paciente error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deletePaciente = async (id: number) => {
    this.submitting = true;
    try {
      await agent.Paciente.delete(id);
      runInAction("deleting paciente", () => {
        this.pacienteRegistry.delete(id);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("delete paciente error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}
