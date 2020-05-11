import { createContext } from "react";
import { configure } from "mobx";
import PacienteStore from "./pacienteStore";

configure({ enforceActions: "always" });

export class RootStore {
    pacienteStore: PacienteStore;

    constructor(){
        this.pacienteStore = new PacienteStore(this);
    }

}

export const RootStoreContext = createContext(new RootStore());