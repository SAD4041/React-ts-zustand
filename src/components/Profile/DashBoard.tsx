import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileBody from "./ProfileBody";
import useUserStore from "@/store/userStore/userStore";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

const DashBoard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("post");
  const { userId } = useUserStore(); // کاربر لاگین شده
  const navigate = useNavigate();
  const params = useParams<{ userId: string }>();

  const viewedUserId = params.userId ? Number(params.userId) : undefined;

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  if (!userId) return <p dir="rtl">در حال بارگذاری...</p>;

  console.log(viewedUserId);
  console.log(userId);

  const profileId = viewedUserId || userId;
  const isOwner = profileId === userId;

  return (
    <>
      <ProfileHeader userId={profileId} isOwner={isOwner} />
      <ProfileBody />
      {/* <ProfileHeader userId={profileId} isOwner={isOwner} />
      <ProfileBody userId={profileId} /> */}
    </>
  );
};

export default DashBoard;
