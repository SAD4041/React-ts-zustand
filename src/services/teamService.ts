// src/services/teamService.ts
import type {
  CreateTeamPayload,
  CreateTeamSuccessResponse,
  Team,
  UpdateTeamPayload,
  TeamInvite,
  TeamStatus,
  AcceptRejectInvitePayload,
  InviteUserPayload
} from "@/types/teamTypes";

import { getData, postData, putData, deleteData, postImageData } from "./services";

/* -----------------------------------------
   CREATE TEAM
   ریسپانس موفق: status 201 + داده تیم
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
   دریافت اطلاعات تیم
----------------------------------------- */
export const getTeamService = async (): Promise<Team> => {
  return getData({
    endPoint: "/v1/user/teams",
  });
};

/* -----------------------------------------
   UPDATE TEAM
   بروزرسانی اطلاعات تیم
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
   حذف تیم
----------------------------------------- */
export const deleteTeamService = async (teamId: string): Promise<void> => {
  return deleteData({
    endPoint: `/v1/user/teams/${teamId}`,
  });
};

/* -----------------------------------------
   INVITE USER
   دعوت کاربر به تیم
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
   دریافت لیست دعوت‌نامه‌ها
----------------------------------------- */
export const getInvitesService = async (teamId: string): Promise<TeamInvite[]> => {
  return getData({
    endPoint: `/v1/user/teams/${teamId}/invitations/pending`,
  });
};

/* -----------------------------------------
   CANCEL INVITE
   لغو دعوت‌نامه
----------------------------------------- */
export const cancelInviteService = async (inviteId: string): Promise<void> => {
  return deleteData({
    endPoint: `/v1/user/teams/invites/${inviteId}`,
  });
};

/* -----------------------------------------
   REMOVE MEMBER
   حذف عضو از تیم
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
   پذیرش دعوت به تیم
----------------------------------------- */
export const acceptInviteService = async (
  payload: AcceptRejectInvitePayload
): Promise<void> => {
  return postData({
    endPoint: `/v1/invitations/accept-team`,
    data: payload,
  });
};

/* -----------------------------------------
   REJECT INVITE
   رد دعوت به تیم
----------------------------------------- */
export const rejectInviteService = async (
  payload: AcceptRejectInvitePayload
): Promise<void> => {
  return postData({
    endPoint: `/v1/invitations/reject-team`,
    data: payload,
  });
};

/* -----------------------------------------
   LEAVE TEAM
   ترک تیم
----------------------------------------- */
export const leaveTeamService = async (teamId: string): Promise<void> => {
  return postData({
    endPoint: `/v1/user/teams/${teamId}/leave`,
    data: {},
  });
};

/* -----------------------------------------
   SUBMIT TEAM
   ثبت نهایی تیم
----------------------------------------- */
export const submitTeamService = async (teamId: string): Promise<void> => {
  return postData({
    endPoint: `/v1/user/teams/${teamId}/submit`,
    data: {},
  });
};

/* -----------------------------------------
   UPLOAD RECEIPT
   آپلود فیش پرداختی
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
   دریافت وضعیت تمام تیم‌ها
----------------------------------------- */
export const getAllTeamStatusesService = async (): Promise<TeamStatus[]> => {
  return getData({
    endPoint: "/v1/user/teams/statuses",
  });
};