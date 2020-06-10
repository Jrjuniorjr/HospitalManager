import {IUser} from "./user";

export interface INotification {
    sender: IUser ;
    receiver: IUser ;
    mensagem: string ;
    id: number | null;
}

export class Notification implements INotification {
    receiver: IUser= {
        id : 0,
        email: "",
        nomeHospital: "",
        username: "",
        roles:[],
        token:"",
        type: "",
    }
    sender :IUser= {
        id : 0,
        email: "",
        nomeHospital: "",
        username: "",
        roles:[],
        token:"",
        type: "",
    }
    mensagem= "";
    id = null;

    
  constructor(init?: INotification) {
    Object.assign(this, init);
  }
}