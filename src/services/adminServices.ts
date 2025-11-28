import { getData, postData } from "./services";

export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  status: "draft" | "submitted" | "waiting_for_payment" | "receipt_pending" | "accepted" | "rejected";
  members: TeamMember[];
  receipt_image_url?: string;
  createdAt?: string;
}

/* -----------------------------------------
   VERIFY RECEIPT - تایید/رد فیش پرداخت
----------------------------------------- */
export const verifyReceiptService = async (
  receiptId: number, // این receipt_id هست نه team_id
  approved: boolean,
  notes?: string
): Promise<void> => {
  return postData({
    endPoint: `/v1/admin/receipts/${receiptId}/verify`, // از receiptId استفاده میشه
    data: {
      approved,
      notes: notes || ""
    },
  });
};

// اضافه کردن تایپ برای Receipt
export type Receipt = {
  id: number;
  team_id: number;
  uploaded_by_id: number;
  uploaded_by_name: string;
  receipt_image_url: string;
  status: string;
  created_at: string;
};

// تابع جدید برای دریافت pending receipts
export const fetchPendingReceiptsService = async (): Promise<Receipt[]> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await fetch("https://api.elmocpc.ir/v1/admin/receipts/pending", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pending receipts: ${response.status}`);
  }

  const data = await response.json();
  return data.data; // بازگشت آرایه receipts از فیلد data
};


/* -----------------------------------------
   GET ALL TEAMS - دریافت لیست تیم‌ها
----------------------------------------- */
export const fetchTeamsService = async (): Promise<Team[]> => {
  try {
    const response = await getData({
      endPoint: "/v1/admin/teams",
    });

    console.log("📦 API Response:", response);

    // اگر response مستقیم آرایه است
    if (Array.isArray(response)) {
      return response;
    }

    // اگر response آبجکت است و فیلد data دارد
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }

    // اگر response آبجکت است و فیلد teams دارد
    if (response && response.teams && Array.isArray(response.teams)) {
      return response.teams;
    }

    // اگر ساختار غیرمنتظره است
    console.warn("⚠️ Unexpected response structure:", response);
    return [];

  } catch (error) {
    console.error("❌ Error in fetchTeamsService:", error);
    return [];
  }
};


/* -----------------------------------------
   APPROVE TEAM - تایید تیم
----------------------------------------- */
export const approveTeamService = async (teamId: number): Promise<void> => {
  return postData({
    endPoint: `/v1/admin/teams/${teamId}/validate`,
    data: {},
  });
};

/* -----------------------------------------
   REJECT TEAM - رد تیم
----------------------------------------- */
export const rejectTeamService = async (teamId: number): Promise<void> => {
  return postData({
    endPoint: `/v1/admin/teams/${teamId}/reject`,
    data: {},
  });
};

// services/adminServices.ts

// اضافه کردن تایپ User
export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tshirt_size: string;
  university: string;
  student_number: string;
  national_code: string;
  email_verified: boolean;
  ip_address?: string; // اضافه کردن فیلد IP
  created_at: string;
  updated_at: string;
};

// اضافه کردن تابع fetchUsersService
export const fetchUsersService = async (): Promise<User[]> => {
  try {
    const response = await getData({
      endPoint: "/v1/admin/users", // ← اگر اندپوینت واقعی users است
    });

    console.log("📦 API Response:", response);

    // اگر response.data.users یک آرایه باشد
    if (response?.data?.users && Array.isArray(response.data.users)) {
      return response.data.users;
    }

    // اگر response.data خود آرایه باشد
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }

    // اگر خود response آرایه باشد
    if (Array.isArray(response)) {
      return response;
    }

    // ساختارهای دیگر
    console.warn("⚠️ Unexpected response:", response);
    return [];

  } catch (error) {
    console.error("❌ Error in fetchUsersService:", error);
    return [];
  }
};
