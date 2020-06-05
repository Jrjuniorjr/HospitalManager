import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
    reaction(
      () => this.username,
      (username) => {
        if (username) {
          window.localStorage.setItem("username", username);
        } else {
          window.localStorage.removeItem("username");
        }
      }
    );
    reaction(
      () => this.id,
      (idHospital) => {
        if (idHospital) {
          window.localStorage.setItem("id", idHospital);
        } else {
          window.localStorage.removeItem("id");
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable username: string | null = window.localStorage.getItem("username");
  @observable id: string | null = window.localStorage.getItem(
    "id"
  );
  @observable appLoaded = false;
  @observable liberateVaga = false;

  @action setToken = (token: string | null) => {
    this.token = token;
  };

  @action setUsername = (username: string | null) => {
    this.username = username;
  };

  @action setId = (id: string | null) => {
    this.id = id;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };

  @action setLiberatedVaga = (boo : boolean) =>{
    this.liberateVaga = boo;
  }

}
