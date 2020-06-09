import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser } from "../models/user";

export default class NotificationStore {
    rootStore: RootStore;
  
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

}