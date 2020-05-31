import { IUser } from "./user";

export interface IVaga {
  id: number | null;
  numeroQuarto: string;
  situacao: string;
  idPaciente: string;

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
  idPaciente = "";
  user = null;

  constructor(init?: IVaga) {
    Object.assign(this, init);
  }
}
