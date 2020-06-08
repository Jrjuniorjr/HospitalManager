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
      () => this.nomeHospital,
      (nomeHospital) => {
        if (nomeHospital) {
          window.localStorage.setItem("nomeHospital", nomeHospital);
        } else {
          window.localStorage.removeItem("nomeHospital");
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
  @observable nomeHospital: string | null = window.localStorage.getItem("nomeHospital");
  @observable id: string | null = window.localStorage.getItem(
    "id"
  );
  @observable appLoaded = false;
  @observable liberateVaga = false;

  @action setToken = (token: string | null) => {
    this.token = token;
  };

  @action setNomeHospital = (nomeHospital: string | null) => {
    this.nomeHospital = nomeHospital;
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
