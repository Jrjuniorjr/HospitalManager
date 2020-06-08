export interface IUser {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
  nomeHospital: string;
}

export interface IUserFormValues {
  username: string;
  email?: string;
  password: string;
  roles?: string[];
  nomeHospital: string;
}
