import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable.shallow modal = {
    open: false,
    body: null,
    objId: null,
  };
  @action openModal = (content: any, id?: any) => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.objId = id;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.objId = null;
  };
}
