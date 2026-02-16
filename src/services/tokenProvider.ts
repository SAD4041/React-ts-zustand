let inMemoryToken: string | null = null;

export const setToken = (token: string) => {
	inMemoryToken = token;
	localStorage.setItem("accessToken", token);
};

export const getToken = (): string | null => {
	return inMemoryToken || localStorage.getItem("accessToken");
};

export const clearToken = () => {
	inMemoryToken = null;
	localStorage.removeItem("accessToken");
};
