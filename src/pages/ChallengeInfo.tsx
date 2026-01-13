/*  ChallengeInfo.tsx  */
import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/Custom/CustomButton";
import BackButtonAndMenu from "@/components/ChallengeManagement/info/BackButtonAndMenu";
import ImageAndBadgeContainer from "@/components/ChallengeManagement/info/ImageAndBadgeContainer";
import LikeAndSaveButtons from "@/components/ChallengeManagement/info/LikeAndSaveButtons";
import TitleAndDescription from "@/components/ChallengeManagement/info/TitleAndDescription";
import DateAndLocation from "@/components/ChallengeManagement/info/DateAndLocation";
import SearchBar from "@/components/ChallengeManagement/public/SearchBar";
import UserCardList from "@/components/ChallengeManagement/public/UserCardsList";
import ChallengeSlideshow from "@/components/ChallengeManagement/info/SlideShow";
import type { UserProfile } from "@/types/userTypes";
import type { ChallengeData } from "@/types/challengeElementsTypes";
import { mockUsers } from "@/data/mockUsers";
import { mockChallenges } from "@/data/mockChallenges";

const DEFAULT_CHALLENGE_IMG =
  "https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2024/04/mount-everest-at-sunset.jpg";

const defaultChallenge: ChallengeData = {
  Img: DEFAULT_CHALLENGE_IMG,
  title: "عنوان چالش",
  description:
    "این چالش برای آزمایش استقامت و مهارت‌های حل مسئله شما طراحی شده است. سفر شامل پیمودن زمین‌های سخت و غلبه بر موانع مختلف است. آیا آماده‌اید تا این ماجراجویی را شروع کنید و مرزهای خود را بسنجید؟",
  dateRange: "از 28 اردیبهشت تا 8 شهریور - سه روز در هفته",
  location: "قله کوه اورست",
  commentsEnabled: false,
  categories: [],
  type: "عمومی",
  memberCount: "0",
  members: [],
};

const ChallengeInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const payload: ChallengeData =
    (location.state?.challenge as ChallengeData) ?? defaultChallenge;

  const {
    Img,
    title,
    description,
    dateRange,
    location: challengeLocation,
    members: incomingMembers = [],
  } = payload;

  const safeImageUrl = Img && Img.trim() !== "" ? Img : DEFAULT_CHALLENGE_IMG;

  const participants = incomingMembers.length > 0 ? incomingMembers : mockUsers;

  const [searchTerm, setSearchTerm] = useState("");
  const [likeCount, setLikeCount] = useState(10);
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredUsers = useMemo(() => {
    return participants.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [participants, searchTerm]);

  const handleDelete = (id: string, username: string) => {
    console.log(`${username} (id:${id}) removed`);
  };

  const handleMenu = () => {
    const editPayload: ChallengeData = {
      ...payload,
      Img: safeImageUrl,
      members: participants,
      memberCount: participants.length.toString(),
    };

    navigate("/editChallenge", {
      state: { challenge: editPayload },
    });
  };

  const handleLike = () => setLikeCount((c) => (c === 10 ? 11 : 10));
  const handleSave = () => console.log("Challenge saved!");

  const nextSlide = () =>
    setCurrentSlide((i) => (i + 1) % mockChallenges.length);
  const prevSlide = () =>
    setCurrentSlide(
      (i) => (i - 1 + mockChallenges.length) % mockChallenges.length
    );

  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      <div className="flex-1 flex flex-col items-center">
        <BackButtonAndMenu onMenuClick={handleMenu} />

        <ImageAndBadgeContainer imageUrl={safeImageUrl} />

        <LikeAndSaveButtons
          onLike={handleLike}
          onSave={handleSave}
          likeCount={likeCount}
        />

        <TitleAndDescription title={title} description={description} />

        <DateAndLocation dateRange={dateRange} location={challengeLocation} />

        <CustomButton className="mt-6 w-full sm:w-full md:w-full max-w-xl bg-primary rounded-[8px] p-5 text-lg hover:bg-primary">
          پیوستن
        </CustomButton>

        <div className="w-full max-w-2xl mt-8" dir="rtl">
          <h2 className="text-xl font-semibold mb-4">شرکت‌کنندگان</h2>

          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />

          <UserCardList
            users={filteredUsers}
            onDelete={handleDelete}
            isOwner={false}
          />
        </div>

        <div className="w-full max-w-2xl mt-10" dir="rtl">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <img
              src="/src/assets/Img/staircase.jpg"
              alt="Staircase"
              className="w-8 h-8 ml-2"
            />
            چالش‌های مرتبط
          </h2>

          <ChallengeSlideshow
            currentChallengeIndex={currentSlide}
            mockChallenges={mockChallenges}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeInfo;
