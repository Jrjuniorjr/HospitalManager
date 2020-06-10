import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { INotification } from "../models/notification";

export default class NotificationStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loadingInitial = false;
  @observable notificationRegistry = new Map();
  @observable submitting = false;
  @observable isSent = false;

  @action setIsSent = (sent: boolean) => {
    this.isSent = sent;
  };

  @action loadNotificationsEnviadas = async () => {
    this.loadingInitial = true;
    this.notificationRegistry = new Map();
    try {
      const notifications = await agent.Notification.listEnviados(
        parseInt(window.localStorage.getItem("id")!)
      );
      runInAction("loading notifications", () => {
        notifications.forEach((notification) => {
          this.notificationRegistry.set(notification.id, notification);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load notifications error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadNotificationsRecebidas = async () => {
    this.loadingInitial = true;
    this.notificationRegistry = new Map();
    try {
      const notifications = await agent.Notification.listRecebidos(
        parseInt(window.localStorage.getItem("id")!)
      );
      runInAction("loading notifications", () => {
        notifications.forEach((notification) => {
          this.notificationRegistry.set(notification.id, notification);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load notifications error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createNotification = async (notification: INotification) => {
    this.submitting = true;
    try {
      await agent.Notification.create(notification);
      runInAction("creating notification", () => {
        this.submitting = false;
      });
      history.push("/dashboard");
    } catch (error) {
      runInAction("create notification error", () => {
        this.submitting = false;
      });
      throw error;
    }
  };
}
