export interface IUsers {
  id: number;
  username: string;
  email: string;
  password: string;
  userImg: string;
  dateOfBirth: string;
  gender: string;
  hashedRt: string;
}

export interface IComments {
  id: number;
  content: string;
  userId: number;
  postId: number;
}

export interface IPosts {
  id: number;
  title: string;
  content: string;
  postImg: string;
  userId: number;
  topicId: number;
}

export interface ISaves {
  id: number;
  postId: number;
  userId: number;
}

export interface ITopics {
  id: number;
  name: string;
}

export interface IVotes {
  id: number;
  status: number;
  postId: number;
  userId: number;
}
