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

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      console.log(user);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.commonStore.setNomeHospital(user.nomeHospital);
      this.rootStore.commonStore.setId(user.id.toString());
      this.rootStore.modalStore.closeModal();
      history.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      values.roles = [];
      await agent.User.register(values);

      this.rootStore.modalStore.closeModal();
      history.push("/");
    } catch (error) {
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
}
