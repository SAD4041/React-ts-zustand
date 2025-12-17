export type User = {
  user: {
    id: number;
    username: string;
  };
  requestId: number;
};

export type UserColor = "gray" | "orange" | "blue";
export type UserIvite = {
  id: number;
  username: string;
};
