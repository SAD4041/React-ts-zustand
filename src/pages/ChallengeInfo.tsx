/*  ChallengeInfo.tsx  */
import React, { useState, useMemo, useEffect } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
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
import type {
  ChallengeData,
  ChallengeDataDetails,
} from "@/types/challengeElementsTypes";
import { mockUsers } from "@/data/mockUsers";
import { mockChallenges } from "@/data/mockChallenges";
import {
  fetchChallengeById,
  joinPrivateChallenge,
  joinPublicChallenge,
  leaveChallenge,
} from "@/services/challengeService";
import {
  getFollowersService,
  getFollowingService,
  getUserById,
  getUserProfileService,
} from "@/services/userService";
import { getParticipatingChallengesService } from "@/services/postService";
import { cn } from "@/lib/utils";
import { set } from "react-hook-form";

const DEFAULT_CHALLENGE_IMG =
  "https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2024/04/mount-everest-at-sunset.jpg";

const defaultChallenge: ChallengeDataDetails = {
  commentsEnabled: false,
  categories: [],
  type: "عمومی",
  memberCount: "0",
  title: "عنوان چالش",
  description:
    "این چالش برای آزمایش استقامت و مهارت‌های حل مسئله شما طراحی شده است. سفر شامل پیمودن زمین‌های سخت و غلبه بر موانع مختلف است. آیا آماده‌اید تا این ماجراجویی را شروع کنید و مرزهای خود را بسنجید؟",

  dateRange: "از 28 اردیبهشت تا 8 شهریور - سه روز در هفته",
  location: "قله کوه اورست",
  Img: DEFAULT_CHALLENGE_IMG,
  participants: [],
  like_count: 0,
  start_time: "28 اردیبهشت",
  end_time: "8شهریور",
  visibility: "public",
};

const ChallengeInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const payload: ChallengeDataDetails =
    (location.state?.challenge as ChallengeDataDetails) ?? defaultChallenge;

  const {
    Img,
    title,
    description,
    dateRange,
    location: challengeLocation,
  } = payload;

  const safeImageUrl = Img && Img.trim() !== "" ? Img : DEFAULT_CHALLENGE_IMG;

  const [challenge, setChallenge] = useState<ChallengeDataDetails>(
    payload as ChallengeDataDetails
  );
  const [participants, setParticipants] = useState<UserProfile[]>([]);
  const [challengeId, setChallengeId] = useState<string | undefined>(
    useParams().challengeId
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [likeCount, setLikeCount] = useState(10);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isParticipated, setIsParticipated] = useState<boolean>(false);

  const filteredUsers = useMemo(() => {
    if (participants) {
      return participants.filter((u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else return null;
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

  const handleLike = () =>
    setChallenge((c) => ({ ...c, like_count: c.like_count + 1 }));
  const handleSave = () => console.log("Challenge saved!");

  const nextSlide = () =>
    setCurrentSlide((i) => (i + 1) % mockChallenges.length);
  const prevSlide = () =>
    setCurrentSlide(
      (i) => (i - 1 + mockChallenges.length) % mockChallenges.length
    );

  useEffect(() => {
    const fetchChallenge = async () => {
      const fetchedChallenge = await fetchChallengeById(String(challengeId));
      setChallenge(fetchedChallenge);
    };

    fetchChallenge();
  }, [challengeId]);
  useEffect(() => {
    const fetchUsers = async () => {
      let users = [];
      console.log("pppp: ", challenge.participants);
      if (!challenge.participants) return;
      for (let user of challenge.participants) {
        console.log("user: ", user);

        const recievedUser = await getUserById(user.user_id);
        const followerData: any = await getFollowersService(user.user_id);
        const followingData: any = await getFollowingService(user.user_id);
        users.push({
          ...recievedUser,
          followersCount: followerData.count,
          followingCount: followingData.count,
        }); // there is no user summary type

        console.log("recievedUser: ", recievedUser);
      }
      users = users.map((x) => convertUserType(x));
      setParticipants(users);
    };
    fetchUsers();
  }, [challenge.participants]);
  useEffect(() => console.log(challenge), [challenge]);
  const convertUserType = (user: any) => {
    return {
      id: user.id,
      username: user.username,
      imagePath: user.profile_pricture,
      bio: user.bio,
      followersCount: user.followersCount, // does not matter. I dont use these three properties here
      followingCount: user.followingCount,
      doneChallengesCount: 0,
    };
  };
  // useEffect(() => {
  //   const checkChallengeList = async () => {
  //     const list = await getParticipatingChallengesService();
  //     console.log("list: ", list);

  //     for (let x of list) {
  //       if (x.id == challengeId) {
  //         setIsParticipated(true);
  //         break;
  //       }
  //     }
  //   };
  //   checkChallengeList();
  // }, [isParticipated]);
  // useEffect(() => {
  //   console.log("is participated: ", isParticipated);
  // }, [isParticipated]);
  const joinChallengeHandler = async () => {
    if (challenge.visibility == "public") {
      if (challengeId) {
        try {
          const data = await joinPublicChallenge(Number(challengeId));
          console.log(data);
        } catch (e) {
          console.log("error: ", e);
        }
      }
    } else if (challenge.visibility == "private") {
      if (challengeId) {
        try {
          const data = await joinPrivateChallenge(Number(challengeId));
          console.log(data);
        } catch (e) {
          console.log("error: ", e);
        }
      }
    }
  };
  const leaveChallengeHandler = async () => {
    if (challengeId) {
      try {
        const data = await leaveChallenge(Number(challengeId));
        setIsParticipated(false);
        console.log(data);
      } catch (e) {
        console.log("error: ", e);
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      <div className="flex-1 flex flex-col items-center">
        <BackButtonAndMenu onMenuClick={handleMenu} />

        <ImageAndBadgeContainer imageUrl={challenge.Img ?? undefined} />

        <LikeAndSaveButtons
          onLike={handleLike}
          onSave={handleSave}
          likeCount={challenge.like_count}
        />

        <TitleAndDescription
          title={challenge.title}
          description={challenge.description}
        />

        <DateAndLocation
          dateRange={challenge.start_time + " - " + challenge.end_time}
          location={challengeLocation}
        />

        <CustomButton
          onClick={joinChallengeHandler}
          className={cn(
            "mt-6 w-full sm:w-full md:w-full max-w-xl bg-primary rounded-2xl p-5 text-lg hover:bg-primary",
            isParticipated && "hidden"
          )}
        >
          پیوستن
        </CustomButton>
        <CustomButton
          //onClick={navigate("/X")}
          className={cn(
            "mt-6 w-full sm:w-full md:w-full max-w-xl bg-secondary rounded-2xl p-5 text-lg hover:bg-secondary",
            isParticipated || "hidden"
          )}
        >
          مشاهده پیشرفت
        </CustomButton>
        
        <CustomButton
          // onClick={leaveChallengeHandler}
          className={cn(
            "mt-6 w-full sm:w-full md:w-full max-w-xl bg-red-main rounded-2xl p-5 text-lg hover:bg-primary",
            isParticipated || "hidden"
          )}
        >
          ترک چالش
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
