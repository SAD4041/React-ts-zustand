import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import convertToPersianDigits from "@/utils/convertToPersianDigits";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
import type { Props } from "@/types/followbarTypes";

const FollowBar: React.FC<Props> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams(); // Extract userId from the URL

  const {
    fullName = props.fullName || "saman khajeamiri",
    bio = props.bio,
    followersCount = props.followersCount,
    followingCount = props.followingCount,
    doneChallengesCount = props.doneChallengesCount || 0,
  } = location.state || {};

  const handleNavigateToFollowerFollowingPage = (
    tab: "followers" | "followings"
  ) => {
    navigate(`/follow/${userId}?tab=${tab}`, {
      state: { userId, fullName }, // Pass userId and fullName as part of the state
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-5 sm:mt-6.5 md:mt-8.4">
      <div className="flex justify-around text-center mr-5 ml-5">
        <div
          onClick={() => console.log("done challenges")}
          tabIndex={0}
          className="cursor-pointer active:bg-gray-main transition-all duration-200"
        >
          <p className="text-sm font-semibold sm:text-base md:text-lg text-black-500">
            موفقیت‌ها
          </p>
          <p className="text-sm sm:text-base md:text-lg text-black-800">
            {convertToPersianDigits(formatFollowBarNumber(doneChallengesCount))}
          </p>
        </div>

        <div
          onClick={() => handleNavigateToFollowerFollowingPage("followers")}
          tabIndex={0}
          className="cursor-pointer active:bg-gray-main transition-all duration-200"
        >
          <p className="text-sm font-semibold sm:text-base md:text-lg text-black-500">
            دنبال‌کنیا
          </p>
          <p className="text-sm sm:text-base md:text-lg text-black-800">
            {convertToPersianDigits(formatFollowBarNumber(followersCount))}
          </p>
        </div>

        <div
          onClick={() => handleNavigateToFollowerFollowingPage("followings")}
          tabIndex={0}
          className="cursor-pointer active:bg-gray-main transition-all duration-200"
        >
          <p className="text-sm font-semibold sm:text-base md:text-lg text-black-500">
            من‌دنبالشونم
          </p>
          <p className="text-sm sm:text-base md:text-lg text-black-800">
            {convertToPersianDigits(formatFollowBarNumber(followingCount))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
