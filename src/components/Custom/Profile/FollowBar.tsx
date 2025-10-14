import convertToPersianDigits from "@/utils/convertToPersianDigits";
import React from "react";
interface Props {
  fullName?: string;
  followersCount?: number;
  followingCount?: number;
  doneChallengesCount?: number;
}
function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\,0$/, "") + "M";
  } else if (num >= 10_000) {
    return (num / 1_000).toFixed(1).replace(/\,0$/, "") + "K";
  } else {
    const number = String(num);
    return (
      number.substring(0, number.length - 3) +
      "," +
      number.substring(number.length - 3, number.length)
    );
  }
}
const FollowBar = ({
  fullName = "saman khajeamiri",
  followersCount = 12520_000,
  followingCount = 12_300,
  doneChallengesCount = 1200,
}: Props) => {
  return (
    <div className="w-full max-w-md mx-auto mt-5">
      {/* full name */}
      <div className="flex justify-center text-center mb-2">
        <p className="text-lg text-black-500">{fullName}</p>
      </div>

      {/* Stats row */}
      <div className="flex justify-around text-center mr-5 ml-5">
        {/* Done challenges */}
        <div>
          <p className="text-sm text-black-500">موفقیت‌ها</p>
          <p className="text-sm font-bold text-black-800">
            {convertToPersianDigits(formatNumber(doneChallengesCount))}
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-gray-500"></div>

        {/* Followers */}
        <div>
          <p className="text-sm text-black-500">دنبال‌کنیا</p>
          <p className="text-sm font-bold text-black-800">
            {convertToPersianDigits(formatNumber(followersCount))}
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-gray-500"></div>

        {/* Following */}
        <div>
          <p className="text-sm text-black-500">من‌دنبالشونم</p>
          <p className="text-sm font-bold text-black-800">
            {convertToPersianDigits(formatNumber(followingCount))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
