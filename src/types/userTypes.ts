export interface UserState {
  token: string | null;
  username: string | null;

  setToken: (token: string | null) => void;
  setUsername: (username: string) => void;
}
