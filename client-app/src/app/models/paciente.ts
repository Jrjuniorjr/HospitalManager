import { IUser } from "./user";

export interface IPaciente {
  id: number | null;
  nome: string;
  email: string;
  user: IUser | null;
}

export class PacienteFormValues implements IPaciente {
  id: number | null = null;
  nome: string = "";
  email: string = "";
  user = null;

  constructor(init?: IPaciente) {
    Object.assign(this, init);
  }

    
  }
