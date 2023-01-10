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

interface IUser {
  user: {
    id: number;
    username: string;
    userImg: string;
    gender: string;
    bio: string;
    email: string;
  }
}

export type {
  ILogin,
  IRegister,
  IUser,
}