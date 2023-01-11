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
  updatedAt: string;
  createdAt: string;
  userId: number;
  commentsCount: number;
  user: {
    userImg: string;
    username: string;
  }
}

interface IPostProps {
  post: IPost
}

interface IComment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    userImg: string;
  }
}

export type {
  ILogin,
  IRegister,
  IUser,
  IPost,
  IPostProps,
  IComment,
}