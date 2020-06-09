import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PacienteStore from "./pacienteStore";
import VagaStore from "./vagaStore";
import NotificationStore from "./notificationStore"

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  pacienteStore: PacienteStore;
  vagaStore: VagaStore;
  notificationStore: NotificationStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.pacienteStore = new PacienteStore(this);
    this.vagaStore = new VagaStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
