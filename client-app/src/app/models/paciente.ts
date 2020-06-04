export interface IPaciente {
  id: number | null;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
}

export class PacienteFormValues implements IPaciente {
  id: number | null = null;
  nome: string = "";
  email: string = "";
  cpf: string = "";
  telefone: string = "";
  dataNascimento: string = "";

  constructor(init?: IPaciente) {
    Object.assign(this, init);
  }
}
