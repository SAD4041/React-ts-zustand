import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileBody from "./ProfileBody";
import useUserStore from "@/store/userStore/userStore";

const DashBoard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("post");
  const { userId } = useUserStore(); // کاربر لاگین شده
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const viewedUserId = params.id ? Number(params.id) : undefined;

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // ← اگر توکن یا userId نبود، برگرد به login
    }
  }, [userId, navigate]);

  if (!userId) return <p>در حال بارگذاری...</p>;

  console.log(viewedUserId)
  console.log(userId)


  const profileId = viewedUserId || userId;
  const isOwner = profileId === userId;

  return (
    <>
      <ProfileHeader userId={profileId} isOwner={isOwner} />
      <ProfileBody userId={profileId} />
    </>
  );
};

export default DashBoard;
