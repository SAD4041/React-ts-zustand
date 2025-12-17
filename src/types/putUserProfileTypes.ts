import type { UpdateProfileRequest } from "@/types/updateProfileTypes";

export interface PutUserProfileParams {
  userId: string | number;
  data: UpdateProfileRequest;
}
