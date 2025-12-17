import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileBody from "./ProfileBody";
import useUserStore from "@/store/userStore/userStore";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import BottomNav from "../Custom/BottomNav";

const DashBoard: React.FC = () => {
  const { userId } = useUserStore(); // کاربر لاگین شده
  const navigate = useNavigate();
  const params = useParams<{ userId: string }>();

  const viewedUserId = params.userId ? Number(params.userId) : undefined;

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }

    return () => {
      document.removeEventListener("dblclick", preventZoom);
    };
  }, [userId, navigate]);

  const preventZoom = (e: MouseEvent) => {
    e.preventDefault();
  };

  if (!userId) return <p dir="rtl">در حال بارگذاری...</p>;

  console.log(viewedUserId);
  console.log(userId);

  const profileId = viewedUserId || userId;
  const isOwner = profileId === userId;

  return (
    <div
      className="min-h-screen"
      style={{
        touchAction: "pan-y", // جلوگیری از زوم پینچ در موبایل
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <ProfileHeader userId={profileId} isOwner={isOwner} />
      <ProfileBody />
      <div className="mt-20 h-fit"
       dir="rtl">
        <BottomNav />
      </div>
    </div>
  );
};

export default DashBoard;
