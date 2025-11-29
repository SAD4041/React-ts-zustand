import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BG from "@/assets/BG.png";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import {
  acceptInviteService,
  rejectInviteService,
} from "@/services/teamService";

function AcceptTeamInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");

  const handleAcceptTeamInvite = async () => {
    try {
      if (!token) {
        toast.error("توکن دعوت یافت نشد");
        return;
      }

      if (!checkAuthentication()) {
        return;
      }

      setLoading(true);
      setError(null);

      await acceptInviteService({ token, invitetoken: token });

      toast.success("شما با موفقیت به تیم اضافه شدید!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Error accepting team invite:", err);

      let errorMsg = "خطا در قبول دعوت";

      if (err.response?.data) {
        const data = err.response.data;

        if (data.messages) {
          errorMsg =
            Object.values(data.messages)
              .flatMap((m: any) => Object.values(m))
              .join(", ") || errorMsg;
        } else if (data.message) {
          errorMsg = data.message;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectTeamInvite = async () => {
    try {
      if (!token) {
        toast.error("توکن دعوت یافت نشد");
        return;
      }

      if (!checkAuthentication()) {
        return;
      }

      setLoading(true);
      setError(null);

      await rejectInviteService({ token, invitetoken: token });

      toast.success("دعوت رد شد");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      console.error("Error rejecting team invite:", err);

      let errorMsg = "خطا در رد کردن دعوت";

      if (err?.messages) {
        // هندل کردن ارورهای مختلف
        if (err.messages.invitation?.["already rejected"]) {
          errorMsg = "این دعوت قبلاً رد شده است";
        } else if (err.messages.invitation?.["already accepted"]) {
          errorMsg = "این دعوت قبلاً قبول شده است";
        } else if (err.messages.invitation?.["expired"]) {
          errorMsg = "این دعوت منقضی شده است";
        } else if (err.messages.invitation?.["not found"]) {
          errorMsg = "دعوت یافت نشد";
        } else {
          errorMsg = Object.values(err.messages).flat().join(", ") || errorMsg;
        }
      } else if (err?.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthentication = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      navigate("/login", {
        state: {
          redirectTo: `/accept-invite?token=${token}`,
        },
      });
      return false;
    }
    return true;
  };

  if (!token) {
    return (
      <div
        className="relative w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl text-red-400">✕</span>
            </div>
            <h1 className="text-white text-2xl text-center font-semibold">
              خطا در پردازش دعوت
            </h1>
            <p className="text-white/70 text-center text-sm">
              توکن دعوت یافت نشد
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 px-6 rounded-lg"
            >
              بازگشت به لاگین
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="w-full max-w-md">
        <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-[#FFD500]/20 rounded-full flex items-center justify-center">
              <span className="text-3xl text-[#FFD500]">👥</span>
            </div>

            <h1 className="text-white text-2xl text-center font-semibold">
              دعوت به تیم
            </h1>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 w-full">
                <p className="text-red-300 text-center text-sm">{error}</p>
              </div>
            )}

            <p className="text-white/70 text-center text-sm">
              آیا می‌خواهید به این تیم اضافه شوید؟
            </p>

            <div className="flex gap-3 w-full" dir="rtl">
              <Button
                onClick={handleAcceptTeamInvite}
                disabled={loading}
                className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
              >
                {loading ? "درحال پردازش..." : "قبول دعوت"}
              </Button>
              <Button
                onClick={handleRejectTeamInvite}
                disabled={loading}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 border border-white/20"
              >
                رد کردن
              </Button>
            </div>
          </div>
        </div>
      </div>

      <img
        src={ELMOCPC}
        alt="ELMOCPC Logo"
        className="absolute bottom-4 right-4 w-32 opacity-80"
      />

      <img
        src={CESA}
        alt="CESA Logo"
        className="absolute bottom-4 left-4 w-20 opacity-80"
      />
    </div>
  );
}

export default AcceptTeamInvite;
