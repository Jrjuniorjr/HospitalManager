import { IUser } from "./user";
import { PacienteFormValues, IPaciente } from "./paciente";

export interface IVaga {
  id: number | null;
  numeroQuarto: string;
  situacao: string;
  paciente?: IPaciente;
  user: IUser | null;
}

export enum SituacaoEnum {
  OCUPADO = "ocupado",
  LIVRE = "livre",
}

export class VagasFormValues implements IVaga {
  id = null;
  numeroQuarto = "";
  situacao = SituacaoEnum.LIVRE;
  paciente?: IPaciente;
  user = null;

  constructor(init?: IVaga) {
    Object.assign(this, init);
  }
}
