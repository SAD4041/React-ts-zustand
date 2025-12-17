// src/services/challengeService.ts
import type { Payload } from "@/types/payloadChallengeService";
import { getData, postData, putData, deleteData } from "./services";
import { getUserById } from "./userService";

// export const createChallenge = async (payload: Payload) => {
import CustomToast from "@/components/Custom/CustomToast";
import type { ChallengeCategoryType } from "@/types/challengeCreateTypes";

let cachedCategories: ChallengeCategoryType[] | null = null;

export const fetchChallengeCategories = async (): Promise<
  ChallengeCategoryType[]
> => {
  if (cachedCategories) return cachedCategories;

  try {
    const response = await getData({
      endPoint: "/api/v1/challenges/categories",
    });

    const raw = response?.data || response;
    const list = Array.isArray(raw) ? raw : raw?.data || [];

    const categories: ChallengeCategoryType[] = list.map((item: any) => ({
      id: Number(item.ID),
      name: item.Name || "Unknown",
    }));

    cachedCategories = categories;
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    CustomToast("خطا در دریافت دسته‌بندی‌ها", "error");
    cachedCategories = [];
    return [];
  }
};

// ================================
// Create Challenge
// ================================

export const createChallenge = async (payload: {
  title: string;
  description: string;
  category_id: number;
  max_participants?: number | null;
  visibility: "public" | "private";
  rule?: string;
  comments_enabled: boolean;
  start_time: string;
  end_time: string;
  timezone: string;
  image_url?: string | null;
}) => {
  try {
    const response = await postData({
      endPoint: "/api/v1/challenges",
      data: payload,
    });
    return response;
  } catch (error) {
    console.error("Failed to create challenge:", error);
    throw error;
  }
};

// ================================
// Fetch Challenge by ID
// ================================

export const fetchChallengeById = async (challengeId: string | number) => {
  try {
    const response = await getData({
      endPoint: `/api/v1/challenges/${challengeId}`,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch challenge:", error);
    throw error;
  }
};

// ================================
// Update Challenge
// ================================

export const updateChallenge = async (
  challengeId: string | number,
  payload: {
    title: string;
    description: string;
    image_url?: string | null;
    location?: string | null;
    start_time: string;
    end_time: string;
    timezone?: string;
  }
) => {
  try {
    const response = await putData({
      endPoint: `/api/v1/challenges/${challengeId}`,
      data: payload,
    });
    return response;
  } catch (error) {
    console.error("Failed to update challenge:", error);
    throw error;
  }
};

// ================================
// Remove Participant
// ================================

export const removeParticipantFromChallenge = async (
  challengeId: string | number,
  participantId: string | number
) => {
  try {
    const response = await deleteData({
      endPoint: `/api/v1/challenges/${challengeId}/participants/${participantId}`,
    });
    return response;
  } catch (error: any) {
    console.error("Failed to remove participant:", error);
    const message =
      error?.message ||
      (error?.body ? JSON.parse(error.body)?.message : null) ||
      "حذف کاربر ناموفق بود";
    throw new Error(message);
  }
};

// ================================
// Invite Single User
// ================================

export const inviteUserToChallenge = async (
  challengeId: number | string,
  inviteeId: number | string
) => {
  const inviteeIdInt = Number(inviteeId);
  if (isNaN(inviteeIdInt)) {
    throw new Error(`Invalid inviteeId: ${inviteeId}`);
  }

  try {
    const response = await postData({
      endPoint: `/api/v1/challenges/${challengeId}/invite`,
      data: { invitee_id: inviteeIdInt },
    });
    return response;
  } catch (error) {
    console.error(
      `Failed to invite user ${inviteeId} to challenge ${challengeId}:`,
      error
    );
    throw error;
  }
};

// ================================
// Invite Multiple Users
// ================================

export const inviteMultipleUsersToChallenge = async (
  challengeId: number | string,
  userIds: (number | string)[]
) => {
  console.log("challengeId: ", challengeId);

  console.log("ids: ", userIds);

  const promises = userIds.map((userId) =>
    inviteUserToChallenge(challengeId, userId).catch((err) => ({
      userId,
      success: false,
      error: err instanceof Error ? err.message : "Invite failed",
    }))
  );

  const results = await Promise.allSettled(promises);

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return { userId: userIds[index], success: true };
    } else {
      const rejected = result as PromiseRejectedResult;
      const reason = rejected.reason as { error?: string } | string;
      const errorMsg =
        typeof reason === "object" && reason?.error
          ? reason.error
          : typeof reason === "string"
            ? reason
            : "Unknown error";

      return {
        userId: userIds[index],
        success: false,
        error: errorMsg,
      };
    }
  });
};
export const joinPublicChallenge = async (challengeId: number) => {
  try {
    const response = await postData({
      endPoint: `/api/v1/challenges/${challengeId}/join`,
      data: {},
    });
    return response.data;
  } catch (error) {
    throw Error("could not join the challenge");
  }
};
export const joinPrivateChallenge = async (challengeId: number) => {
  try {
    const response = await postData({
      endPoint: `/api/v1/challenges/${challengeId}/request`,
      data: {},
    });
    return response.data;
  } catch (error) {
    throw Error("could not join the challenge");
  }
};

export const leaveChallenge = async (challengeId: number) => {
  try {
    const response = await postData({
      endPoint: `/api/v1/challenges/${challengeId}/leave`,
      data: {},
    });
    return response.data;
  } catch (error) {
    throw Error("could not join the challenge");
  }
};

export const showRequestingUsers = async (challengeId: number) => {
  try {
    const response = await getData({
      endPoint: `/api/v1/challenges/${challengeId}/requests`,
    });
    console.log("data: ", response.data);

    const userIds = response.data
      .filter((req) => req.Status == "pending")
      .map((req) => [req.RequesterID, req.ID]);
    const users = [];
    for (let [reqester, req] of userIds) {
      const user = await getUserById(reqester);
      users.push({ user: user, requestId: req });
    }
    console.log("users: ", users);
    return users;
  } catch (error) {
    throw Error("could not join the challenge");
  }
};

export const acceptReq = async (requestId: number) => {
  try {
    const response = await postData({
      endPoint: `/api/v1/challenges/requests/${requestId}/accept`,
      data: {},
    });
    return response.data;
  } catch (error) {
    throw Error("could not join the challenge");
  }
};
export const deleteReq = async (requestId: number) => {
  try {
    const response = await postData({
      endPoint: `/api/v1/challenges/requests/${requestId}/decline`,
      data: {},
    });
    return response.data;
  } catch (error) {
    throw Error("could not join the challenge");
  }
};

// export const fetchChallengeById = async (challengeId: string | number) => {
//   try {
//     const response = await getData({
//       endPoint: `/api/v1/challenges/${challengeId}`,
//     });
//     return response.data; // اطلاعات کامل چالش
//   } catch (error) {
//     console.error("Failed to fetch challenge:", error);
//     throw error;
//   }
// };
export const dateLocationDefaultValues = {
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  location: "",
};

export const titleAndDescriptionDefaultValues = {
  challengeTitle: "",
  challengeDescription: "",
};
