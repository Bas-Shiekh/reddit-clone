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
  id: number;
  username: string;
  userImg: string;
  gender: string;
  bio: string;
  email: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  topicName: string | null;
  postImg: string | null;
  updateAt: string;
  createAt: string;
  userId: number;
}

interface IPostProps {
  user: IUser;
  post: IPost
}

export type {
  ILogin,
  IRegister,
  IUser,
  IPost,
  IPostProps,
}