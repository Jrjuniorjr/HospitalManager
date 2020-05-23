export interface IVaga {
  id: number | null;
  numeroQuarto: number | null;
  situacao: situacaoEnum | null;
  idPaciente: number | null;
  idPerfilHospital: number | null;
}

export enum situacaoEnum {
  OCUPADO = "ocupado",
  LIVRE = "livre",
}

export class VagasFormValues implements IVaga {
  id: number | null = null;
  numeroQuarto: number | null = null;
  situacao: situacaoEnum | null = null;
  idPaciente: number | null = null;
  idPerfilHospital: number | null = null;

  constructor(init?: IVaga) {
    Object.assign(this, init);
  }

  createPrototype(): VagasFormValues {
    const obj = {
      id: null,
      numeroQuarto: null,
      situacao: null,
      idPaciente: null,
      idPerfilHospital: null,
    };
    return new VagasFormValues(obj);
  }
}
