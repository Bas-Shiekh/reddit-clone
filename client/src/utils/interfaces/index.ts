interface IRegister {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  email: string;
  password: string;
}

export type {
  ILogin,
  IRegister,
}