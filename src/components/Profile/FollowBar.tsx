import convertToPersianDigits from "@/utils/convertToPersianDigits";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
import React from "react";
interface Props {
  fullName?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  doneChallengesCount?: number;
}

const FollowBar = ({
  fullName = "saman khajeamiri",
  bio = "سلااام صبحت بخیررر",
  followersCount = 12520_000,
  followingCount = 12_300,
  doneChallengesCount = 1200,
}: Props) => {
  return (
    <div className="w-full max-w-md mx-auto mt-5 sm:mt-6.5 md:mt-8.4">
      {/* full name */}
      <div className="flex justify-center text-center">
        <p className="text-lg sm:text-xl md:text-2xl text-black-500">{fullName}</p>
      </div>

      <div className="flex justify-center text-center mb-2">
        <p className="text-xs sm:text-sm md:text-base text-black-500">{bio}</p>
      </div>

      {/* Stats row */}
      <div className="flex justify-around text-center mr-5 ml-5">
        {/* Done challenges */}
        <div onClick={() => console.log("done challenges")} tabIndex={0} className="active:bg-[var(--color-gray-main)] transition-all duration-200">
          <p className="text-sm sm:text-base md:text-lg text-black-500">موفقیت‌ها</p>
          <p className="text-sm sm:text-base md:text-lg font-bold text-black-800">
            {convertToPersianDigits(formatFollowBarNumber(doneChallengesCount))}
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-gray-500"></div>

        {/* Followers */}
        <div onClick={() => console.log("followers")} tabIndex={0} className="active:bg-[var(--color-gray-main)] transition-all duration-200" >
          <p className="text-sm sm:text-base md:text-lg text-black-500">دنبال‌کنیا</p>
          <p className="text-sm sm:text-base md:text-lg font-bold text-black-800">
            {convertToPersianDigits(formatFollowBarNumber(followersCount))}
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-gray-500"></div>

        {/* Following */}
        <div onClick={() => console.log("following")} tabIndex={0} className="active:bg-[var(--color-gray-main)] transition-all duration-200">
          <p className="text-sm sm:text-base md:text-lg text-black-500">من‌دنبالشونم</p>
          <p className="text-sm sm:text-base md:text-lg font-bold text-black-800">
            {convertToPersianDigits(formatFollowBarNumber(followingCount))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
