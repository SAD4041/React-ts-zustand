// src/services/teamService.ts
// src/services/teamService.ts
import type {
  CreateTeamPayload,
  CreateTeamSuccessResponse,
  Team,
  UpdateTeamPayload,
  TeamInvite,
  TeamStatus,
  // AcceptRejectInvitePayload,
  InviteUserPayload
} from "@/types/teamTypes";

import { getData, postData, putData, deleteData, postImageData } from "./services";

// تایپ برای تیم در داشبورد
export type DashboardTeam = {
  id: string;
  name: string;
  description: string;
  status: string;
  creator_id: number;
  receipt_image_url?: string;
  members: {
    id: string;
    name: string;
    familyName: string;
    email: string;
    phone: string;
    role: string;
  }[];
} | null;

// تابع برای ترجمه status به فارسی
export const translateTeamStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'draft': 'پیش‌نویس',
    'submitted': 'ثبت شده',
    'waiting_for_payment': 'در انتظار پرداخت',
    'receipt_pending': 'در انتظار تایید فیش',
    'accepted': 'تایید شده',
    'rejected': 'رد شده'
  };
  return statusMap[status] || status;
};

// تابع برای دریافت رنگ status
export const getStatusColor = (status: string): string => {
  const colorMap: { [key: string]: string } = {
    'draft': 'text-gray-400 bg-gray-500/20',
    'submitted': 'text-blue-400 bg-blue-500/20',
    'waiting_for_payment': 'text-yellow-400 bg-yellow-500/20',
    'receipt_pending': 'text-orange-400 bg-orange-500/20', 
    'accepted': 'text-green-400 bg-green-500/20',
    'rejected': 'text-red-400 bg-red-500/20'
  };
  return colorMap[status] || 'text-gray-400 bg-gray-500/20';
};

// تابع برای دریافت وضعیت ثبت‌نام کاربر
export const getUserRegistrationStatus = (teamData: DashboardTeam | null): { text: string; color: string } => {
  if (!teamData) {
    return { text: 'ثبت‌نام نشده', color: 'text-red-400 bg-red-500/20' };
  }

  const statusMap: { [key: string]: { text: string; color: string } } = {
    'draft': { text: 'پیش‌نویس', color: 'text-gray-400 bg-gray-500/20' },
    'submitted': { text: 'ثبت شده', color: 'text-blue-400 bg-blue-500/20' },
    'waiting_for_payment': { text: 'در انتظار پرداخت', color: 'text-yellow-400 bg-yellow-500/20' },
    'receipt_pending': { text: 'در انتظار تایید', color: 'text-orange-400 bg-orange-500/20' },
    'accepted': { text: 'تایید شده', color: 'text-green-400 bg-green-500/20' },
    'rejected': { text: 'رد شده', color: 'text-red-400 bg-red-500/20' }
  };

  return statusMap[teamData.status] || { text: 'نامشخص', color: 'text-gray-400 bg-gray-500/20' };
};

/* -----------------------------------------
   GET TEAM FOR DASHBOARD
   دریافت اطلاعات تیم برای نمایش در داشبورد
----------------------------------------- */
export const getTeamForDashboardService = async (): Promise<DashboardTeam> => {
  try {
    const response = await getData({
      endPoint: "/v1/user/teams",
    });
    
    // مپ کردن داده‌های تیم به فرمت مورد نیاز داشبورد
    return {
      id: response.data.id.toString(),
      name: response.data.name,
      description: response.data.description,
      status: response.data.status,
      creator_id: response.data.creator_id,
      receipt_image_url: response.data.receipt_image_url,
      members: response.data.members?.map((member: any) => ({
        id: member.id.toString(),
        name: member.first_name,
        familyName: member.last_name,
        email: member.email,
        phone: member.phone,
        role: member.id === response.data.creator_id ? "کاپیتان" : "عضو"
      })) || []
    };
  } catch (error) {
    // اگر تیمی وجود نداشت، null برمی‌گردانیم
    if ((error as any).response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// ... بقیه سرویس‌ها بدون تغییر

/* -----------------------------------------
   CREATE TEAM
----------------------------------------- */
export const createTeamService = async (
  payload: CreateTeamPayload
): Promise<CreateTeamSuccessResponse> => {
  return postData({
    endPoint: "/v1/user/teams",
    data: payload,
  });
};

/* -----------------------------------------
   GET TEAM
----------------------------------------- */
export const getTeamService = async (): Promise<Team> => {
  return getData({
    endPoint: "/v1/user/teams",
  });
};

/* -----------------------------------------
   UPDATE TEAM
----------------------------------------- */
export const updateTeamService = async (
  teamId: string,
  payload: UpdateTeamPayload
): Promise<Team> => {
  return putData({
    endPoint: `/v1/user/teams/${teamId}`,
    data: payload,
  });
};

/* -----------------------------------------
   DELETE TEAM
----------------------------------------- */
export const deleteTeamService = async (teamId: string): Promise<void> => {
  return deleteData({
    endPoint: `/v1/user/teams/${teamId}`,
  });
};

/* -----------------------------------------
   INVITE USER
----------------------------------------- */
export const inviteUserService = async (
  teamId: string,
  payload: InviteUserPayload
): Promise<void> => {
  return postData({
    endPoint: `/v1/user/teams/${teamId}/invitations`,
    data: payload,
  });
};

/* -----------------------------------------
   GET INVITES
----------------------------------------- */
// در فایل teamService.ts
// در فایل teamService.ts
interface InvitesResponse {
  status: number;
  message: string;
  data: TeamInvite[];
}

export const getInvitesService = async (teamId: string): Promise<InvitesResponse> => {
  return getData({
    endPoint: `/v1/user/teams/${teamId}/invitations/pending`,
  });
};
/* -----------------------------------------
   CANCEL INVITE
----------------------------------------- */
export const cancelInviteService = async (invitetoken: string, inviteTeamid: string): Promise<void> => {
  return deleteData({
    endPoint: `/v1/user/teams/${inviteTeamid}/invitations/${invitetoken}`,
  });
};

/* -----------------------------------------
   REMOVE MEMBER
----------------------------------------- */
export const removeMemberService = async (
  teamId: string,
  memberId: string
): Promise<void> => {
  return deleteData({
    endPoint: `/v1/user/teams/${teamId}/members/${memberId}`,
  });
};

/* -----------------------------------------
   ACCEPT INVITE
----------------------------------------- */
export const acceptInviteService = async (
  payload: string
): Promise<void> => {
  return postData({
    endPoint: `/v1/invitations/accept-team`,
    data: payload,
  });
};

/* -----------------------------------------
   REJECT INVITE
----------------------------------------- */
export const rejectInviteService = async (
  payload: string
): Promise<void> => {
  return postData({
    endPoint: `/v1/invitations/reject-team`,
    data: payload,
  });
};

/* -----------------------------------------
   LEAVE TEAM
----------------------------------------- */
export const leaveTeamService = async (teamId: string): Promise<void> => {
  return postData({
    endPoint: `/v1/user/teams/${teamId}/leave`,
    data: {},
  });
};

/* -----------------------------------------
   SUBMIT TEAM
----------------------------------------- */
export const submitTeamService = async (teamId: string): Promise<void> => {
  return postData({
    endPoint: `/v1/user/teams/${teamId}/submit`,
    data: {},
  });
};

/* -----------------------------------------
   UPLOAD RECEIPT
----------------------------------------- */
export const uploadReceiptService = async (
  teamId: string,
  formData: FormData
): Promise<void> => {
  return postImageData({
    endPoint: `/v1/user/teams/${teamId}/upload-receipt`,
    data: formData,
  });
};

/* -----------------------------------------
   GET ALL TEAM STATUSES
----------------------------------------- */
export const getAllTeamStatusesService = async (): Promise<TeamStatus[]> => {
  return getData({
    endPoint: "/v1/user/teams/statuses",
  });
};