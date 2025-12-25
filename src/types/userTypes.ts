// types/userTypes.ts
import type { AuthUserWithTokens } from "./authTypes";

export interface UserState {
  // اطلاعات یوزر بدون توکن‌ها
  user: Omit<AuthUserWithTokens, "access_token" | "refresh_token"> | null;

  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // بعد از لاگین / verify OTP این رو صدا می‌زنیم
  setAuth: (payload: AuthUserWithTokens) => void;

  // خروج
  logout: () => void;
}