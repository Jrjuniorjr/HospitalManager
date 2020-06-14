import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable nomeHospital: string | null = null;
  @observable id: number | null = null;
  @observable userRegistry = new Map();
  @observable loadingInitial = false;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @computed get isUserRegistryEmpty() {
    if (this.userRegistry.size > 0) {
      return false;
    } else {
      return true;
    }
  }

  @action login = async (values: IUserFormValues) => {
    try {
      this.loadingInitial = true;
      const user = await agent.User.login(values);
      runInAction(() => {
        this.loadingInitial = false;
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.commonStore.setNomeHospital(user.nomeHospital);
      this.rootStore.commonStore.setId(user.id.toString());
      this.rootStore.modalStore.closeModal();
      history.push("/dashboard");
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      this.loadingInitial = true;
      values.roles = [];
      await agent.User.register(values);
      runInAction(() => {
        this.loadingInitial = false;
      });
      this.rootStore.modalStore.closeModal();
      history.push("/");
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      throw error;
    }
  };

  @action getNomeHospital = async () => {
    this.nomeHospital = window.localStorage.getItem("nomeHospital");
  };

  @action getId = async () => {
    this.id = parseInt(window.localStorage.getItem("id")!);
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setNomeHospital(null);
    this.rootStore.commonStore.setId(null);
    this.nomeHospital = null;
    this.user = null;
    this.id = null;
    history.push("/");
  };

  @action loadUsers = async () => {
    this.loadingInitial = true;
    this.userRegistry = new Map();
    try {
      const users = await agent.User.listAll();
      runInAction("loading Users", () => {
        users.forEach((user) => {
          this.userRegistry.set(user.id, user);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load user error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}
