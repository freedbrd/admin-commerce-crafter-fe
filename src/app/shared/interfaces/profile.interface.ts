export interface IProfile {
  name: string;
  email: string;
  user_id: string;
}

export interface ISignupUser extends IProfile {
  password: string;
  checkPassword: string;
}
