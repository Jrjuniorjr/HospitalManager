export interface IUser {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
  nomeHospital: string;
  telefone?: string;
}

export interface IUserFormValues {
  username: string;
  email?: string;
  password: string;
  roles?: string[];
  nomeHospital: string;
}

export interface IUserItem {
  nomeHospital: string;
  telefone?: string;
  email?: string;
  id: number;
}

