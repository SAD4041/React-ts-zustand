export interface UserState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}
