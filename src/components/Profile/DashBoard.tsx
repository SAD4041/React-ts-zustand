import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { useParams } from "react-router-dom";
import ProfileBody from "./ProfileBody";

const DashBoard = () => {
  // Extract userId from URL and convert it to a number
  const { userId } = useParams<{ userId: string }>();

  // Provide a fallback value if userId is undefined (e.g., 0)
  const userIdNumber = userId ? parseInt(userId, 10) : 0;  // Default to 0 if undefined

  const [selectedPage, setSelectedPage] = useState("post");

  return (
    <>
      {/* Pass userId as a number */}
      <ProfileHeader userId={userIdNumber} isOwner={false} />
      <ProfileBody />
    </>
  );
};

export default DashBoard;
