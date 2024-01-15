export interface IProfile {
  name: string;
  email: string;
}

export interface ISignupUser extends IProfile {
  password: string;
  checkPassword: string;
}
