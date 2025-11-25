// types/teamTypes.ts

// ===========================
// مشترک‌ها
// ===========================

// اطلاعات تیم - براساس response واقعی
export interface Team {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  status: string;
  members: TeamMember[];
  createdAt?: string;
  updatedAt?: string;
}

// اطلاعات عضو تیم - براساس response واقعی
export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  userId?: number;
  role?: string; // 'owner' | 'member'
  joinedAt?: string;
}

// اطلاعات دعوت‌نامه
export interface TeamInvite {
  id: number;
  teamId: number;
  email: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  invitedBy: number;
}

// وضعیت تیم
export interface TeamStatus {
  teamId: number;
  teamName: string;
  status: 'active' | 'inactive' | 'submitted' | 'pending' | 'draft';
  memberCount: number;
  submittedAt?: string;
  paymentStatus: 'pending' | 'paid' | 'verified';
}

// ===========================
// CREATE TEAM (ساخت تیم)
// ===========================

// بدنه‌ی درخواست ساخت تیم - فقط نام و توضیحات
export interface CreateTeamPayload {
  name: string;
  description: string;
}

// ریسپانس موفق ساخت تیم - براساس response واقعی
export interface CreateTeamSuccessResponse {
  status: number;       // 200
  message: string;      // "team retrieved successfully"
  data: Team;
}

// خطای ساخت تیم
export interface CreateTeamErrorResponse {
  status: number;   // 409
  messages: {
    team?: {
      user_already_has_team?: string;
      name_already_exists?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// UPDATE TEAM (ویرایش تیم)
// ===========================

// بدنه‌ی درخواست ویرایش تیم
export interface UpdateTeamPayload {
  name?: string;
  description?: string;
}

// ریسپانس موفق ویرایش
export interface UpdateTeamSuccessResponse {
  status: number;       // 200
  message: string;      // "team updated successfully"
  data: Team;
}

// خطای ویرایش تیم (مثلاً تیم پیدا نشد)
export interface UpdateTeamErrorResponse {
  status: number;       // 404
  messages?: {
    team?: {
      not_found?: string;
      name_already_exists?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// DELETE TEAM (حذف تیم)
// ===========================

export interface DeleteTeamSuccessResponse {
  status: number;       // 200
  message: string;      // "team deleted successfully"
  data: null;
}

export interface DeleteTeamErrorResponse {
  status: number;       // 404
  messages?: {
    team?: {
      not_found?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// INVITE USER (دعوت کاربر)
// ===========================
export interface Member {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  national_code: string;
  tshirt_size: string;
  university: string;
}

export interface InviteUserPayload {
  members: Member[];
}


export interface InviteUserSuccessResponse {
  status: number;       // 200
  message: string;      // "invitation sent successfully"
  data: null;
}

export interface InviteUserErrorResponse {
  status: number;       // 400 | 404 | 409
  messages?: {
    email?: {
      invalid?: string;
      not_found?: string;
      already_in_team?: string;
      already_invited?: string;
    };
    team?: {
      not_found?: string;
      full?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// GET INVITES (دریافت دعوت‌نامه‌ها)
// ===========================

export interface GetInvitesSuccessResponse {
  status: number;       // 200
  message: string;      // "invites retrieved successfully"
  data: TeamInvite[];
}

// ===========================
// CANCEL INVITE (لغو دعوت)
// ===========================

export interface CancelInviteSuccessResponse {
  status: number;       // 200
  message: string;      // "invitation cancelled successfully"
  data: null;
}

export interface CancelInviteErrorResponse {
  status: number;       // 404
  messages?: {
    invite?: {
      not_found?: string;
      already_accepted?: string;
      already_rejected?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// REMOVE MEMBER (حذف عضو)
// ===========================

export interface RemoveMemberSuccessResponse {
  status: number;       // 200
  message: string;      // "member removed successfully"
  data: null;
}

export interface RemoveMemberErrorResponse {
  status: number;       // 404
  messages?: {
    member?: {
      not_found?: string;
      cannot_remove_owner?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// ACCEPT/REJECT INVITE (پذیرش/رد دعوت)
// ===========================

export interface AcceptRejectInvitePayload {
  invitetoken: string;
}

export interface AcceptRejectInviteSuccessResponse {
  status: number;       // 200
  message: string;      // "invitation accepted/rejected successfully"
  data: Team;
}

export interface AcceptRejectInviteErrorResponse {
  status: number;       // 404
  messages?: {
    invite?: {
      not_found?: string;
      expired?: string;
      already_processed?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// LEAVE TEAM (ترک تیم)
// ===========================

export interface LeaveTeamSuccessResponse {
  status: number;       // 200
  message: string;      // "left team successfully"
  data: null;
}

export interface LeaveTeamErrorResponse {
  status: number;       // 400 | 404
  messages?: {
    team?: {
      not_found?: string;
      owner_cannot_leave?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// SUBMIT TEAM (ثبت نهایی تیم)
// ===========================

export interface SubmitTeamSuccessResponse {
  status: number;       // 200
  message: string;      // "team submitted successfully"
  data: null;
}

export interface SubmitTeamErrorResponse {
  status: number;       // 400 | 404
  messages?: {
    team?: {
      not_found?: string;
      already_submitted?: string;
      incomplete?: string;
      payment_required?: string;
    };
    [key: string]: any;
  };
  data: null;
}

// ===========================
// UPLOAD RECEIPT (آپلود فیش)
// ===========================

export interface UploadReceiptSuccessResponse {
  status: number;       // 200
  message: string;      // "receipt uploaded successfully"
  data: {
    receiptUrl: string;
    verified: boolean;
  };
}

export interface UploadReceiptErrorResponse {
  status: number;       // 400 | 404
  messages?: {
    receipt?: {
      invalid_format?: string;
      too_large?: string;
      upload_failed?: string;
    };
    team?: {
      not_found?: string;
      not_submitted?: string;
    };
    [key: string]: ;
  };
  data: string;
}

// ===========================
// GET ALL TEAM STATUSES (وضعیت تیم‌ها)
// ===========================

export interface GetAllTeamStatusesSuccessResponse {
  status: number;       // 200
  message: string;      // "team statuses retrieved successfully"
  data: TeamStatus[];
}

// ===========================
// RESPONSE TYPES (انواع عمومی پاسخ)
// ===========================

export interface BaseSuccessResponse {
  status: number;
  message: string;
  data: any;
}

export interface BaseErrorResponse {
  status: number;
  messages: {
    [key: string]: any;
  };
  data: null;
}