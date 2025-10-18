import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import FollowBar from "./FollowBar";
import { useParams } from "react-router-dom";
import ProfileBody from "./ProfileBody";

const DashBoard = () => {
  // const {username} = useParams(); //should be passed to the dashboard
  // const loggedUser = "saman";
  // const isOwner = loggedUser === username; //should be passed

  const [selectedPage, setSelectedPage] = useState("post");

  return (
    <>
      <ProfileHeader fullName="saman khajeamiri" isOwner={true} />
      <ProfileBody></ProfileBody>
    </>
  );
};

export default DashBoard;
