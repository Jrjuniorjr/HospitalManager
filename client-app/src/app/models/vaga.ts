import { IUser } from "./user";
import { IPaciente } from "./paciente";

export interface IVaga {
  id: number | null;
  numeroQuarto: string;
  situacao: string;
  paciente?: IPaciente | null;
  user: IUser | null;
  descricao: string;
  dataAlocacao: string;
}

export enum SituacaoEnum {
  OCUPADO = "ocupado",
  LIVRE = "livre",
}

export class VagasFormValues implements IVaga {
  id = null;
  numeroQuarto = "";
  situacao = SituacaoEnum.LIVRE;
  paciente?: IPaciente | null;
  user = null;
  descricao = "";
  dataAlocacao = "";

  constructor(init?: IVaga) {
    Object.assign(this, init);
  }
}
