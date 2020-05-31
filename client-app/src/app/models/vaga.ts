export interface IVaga {
  id: number | null;
  numeroQuarto: string;
  situacao: string;
  idPaciente: string;
  idPerfilHospital: string;
}

export enum SituacaoEnum {
  OCUPADO = "ocupado",
  LIVRE = "livre",
}

export class VagasFormValues implements IVaga {
  id: number | null = null;
  numeroQuarto: string = "";
  situacao: string = SituacaoEnum.LIVRE;
  idPaciente: string = "";
  idPerfilHospital: string = "";

  constructor(init?: IVaga) {
    Object.assign(this, init);
  }

  createPrototype(): VagasFormValues {
    const obj = {
      id: null,
      numeroQuarto: "",
      situacao: SituacaoEnum.LIVRE,
      idPaciente: "",
      idPerfilHospital: "",
    };
    return new VagasFormValues(obj);
  }
}
