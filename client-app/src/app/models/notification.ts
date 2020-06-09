import {IUser} from "./user";

export interface INotification {
    sender: IUser;
    receiver: IUser;
    mensagem: string;
    id: number | null;
}

export class Notification implements INotification {
    sender: IUser;
    receiver: IUser;
    mensagem: string;
    id: number | null;

    
  constructor(init?: INotification) {
    Object.assign(this, init);
  }
}