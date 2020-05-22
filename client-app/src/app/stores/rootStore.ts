import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PacienteStore from "./pacienteStore";

configure({ enforceActions: "always" });

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    pacienteStore: PacienteStore;

    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.pacienteStore = new PacienteStore(this);
    }

}

export const RootStoreContext = createContext(new RootStore);
