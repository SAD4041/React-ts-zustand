export interface UserState {
	username: string | null;
	setUsername: (username: string) => void;
	accessToken : string | null;
	setAccessToken : (accessToken: string | undefined) => void;
}
