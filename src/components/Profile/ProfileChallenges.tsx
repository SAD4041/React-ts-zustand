import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { Search } from "lucide-react";
import ChallengeCard from "../Custom/ChallangeCard";
import CustomInput from "../Custom/CustomInput";
import CustomDropdown from "../Custom/CustomDropdown";
import { useNavigate } from "react-router-dom";

import {
  getParticipatingChallengesService,
  getCreatedChallengesService,
  getMutualFollowersService,
} from "@/services/userService";

import type { Challenge } from "@/types/challengeTypes";
import { convertToJalali } from "../Custom/ConvertToJalali";

const ProfileChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "ورزشی" },
    { id: 2, name: "هنری" },
    { id: 3, name: "علمی" },
    { id: 4, name: "تفریحی" },
    { id: 0, name: "چالش‌های من" },
  ];

  const [checkedCategories, setCheckedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [search, setSearch] = useState("");

  // ----- تابع گرفتن mutual followers برای یک چالش -----
  const fetchMutualFollowers = async (challengeId: number) => {
    try {
      const response = await getMutualFollowersService(challengeId);
      return response.data || response;
    } catch (error) {
      console.error("Error fetching mutual followers:", error);
      return [];
    }
  };

  // ----- گرفتن چالش‌هایی که کاربر در آن شرکت کرده -----
  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getParticipatingChallengesService();
      let challengesData = response;

      challengesData = await Promise.all(
        challengesData.map(async (ch) => {
          const mutualFollowers = await fetchMutualFollowers(ch.id);
          return { ...ch, mutualFollowers };
        })
      );

      setChallenges(challengesData);
      setAllChallenges(challengesData);
    } catch (err) {
      setError("خطا در دریافت چالش‌ها");
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  // ----- گرفتن چالش‌هایی که کاربر خودش ساخته -----
  const fetchMyChallenges = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentUserId = 2;

      const response = await getCreatedChallengesService(currentUserId);
      let myChallengesData = response;

      myChallengesData = await Promise.all(
        myChallengesData.map(async (ch) => {
          const mutualFollowers = await fetchMutualFollowers(ch.id);
          return { ...ch, mutualFollowers };
        })
      );

      setChallenges(myChallengesData);
      setAllChallenges(myChallengesData);
    } catch (err) {
      setError("خطا در دریافت چالش‌های شما");
      console.error("Error fetching my challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const getCategoryId = (categoryName: string): number => {
    const map: { [key: string]: number } = {
      Fitness: 1,
      Art: 2,
      Science: 3,
      Entertainment: 4,
      ورزشی: 1,
      هنری: 2,
      علمی: 3,
      تفریحی: 4,
    };
    return map[categoryName] || 1;
  };

  const selectedCategoryIds = Object.keys(checkedCategories)
    .filter((key) => checkedCategories[Number(key)])
    .map(Number);

  const isMyChallengesSelected = checkedCategories[0];

  useEffect(() => {
    if (isMyChallengesSelected) fetchMyChallenges();
    else fetchChallenges();
  }, [isMyChallengesSelected]);

  const handleCategoryChange = (newChecked: { [key: number]: boolean }) => {
    if (newChecked[0] && !checkedCategories[0]) {
      setCheckedCategories({ 0: true });
    } else if (
      !newChecked[0] &&
      Object.keys(newChecked).some(
        (k) => Number(k) !== 0 && newChecked[Number(k)]
      )
    ) {
      const updated = { ...newChecked };
      delete updated[0];
      setCheckedCategories(updated);
    } else setCheckedCategories(newChecked);
  };

  const searchedChallenges = search
    ? allChallenges
        .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          const s = search.toLowerCase();
          const score = (t: string) => (t === s ? 3 : t.startsWith(s) ? 2 : 1);
          return score(b.title.toLowerCase()) - score(a.title.toLowerCase());
        })
    : allChallenges;

  const categoryFilteredChallenges =
    selectedCategoryIds.length === 0 || isMyChallengesSelected
      ? searchedChallenges
      : searchedChallenges.filter((c) =>
          selectedCategoryIds.includes(getCategoryId(c.category_name))
        );

  const filteredChallenges = categoryFilteredChallenges;

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-error text-center">
          <p>{error}</p>
          <button
            onClick={
              isMyChallengesSelected ? fetchMyChallenges : fetchChallenges
            }
            className="mt-2 px-4 py-2 bg-secondry text-white rounded hover:bg-secondry"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* جستجو + فیلتر */}
      <div className="flex justify-start items-center w-full sm:w-126 md:w-139 m-2.5 gap-1">
        <div className="w-2/3">
          <Formik
            initialValues={{ challengeSearch: "" }}
            onSubmit={(v) => setSearch(v.challengeSearch)}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="relative flex items-center"
              >
                <CustomInput
                  width="w-full"
                  icon={
                    <button
                      type="submit"
                      className="flex items-center cursor-pointer"
                    >
                      <Search className="text-[var(--color-blue-main)]" />
                    </button>
                  }
                  name="challengeSearch"
                  label="جستجو"
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="w-1/3">
          <CustomDropdown
            items={categories}
            checkedCategories={checkedCategories}
            setCheckedCategories={handleCategoryChange}
          />
        </div>
      </div>

      {/* نمایش چالش‌ها */}
      {!loading && filteredChallenges.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-2.5">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              onClick={() => navigate(`/challenge/${challenge.id}`)}
              title={challenge.title}
              description={challenge.description}
              startDate={convertToJalali(challenge.start_time)}
              endDate={convertToJalali(challenge.end_time)}
              profiles={
                challenge.mutualFollowers?.map((user: any) => ({
                  id: user.id,
                  name: user.username,
                  avatar: user.avatar_url,
                })) || []
              }
              initialLikes={challenge.like_count}
              initialComments={challenge.comment_count}
              coverImage={
                challenge.image_url ||
                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
              }
              isPrivate={challenge.visibility === "private"}
              isJoined={challenge?.is_user_participating || true}
              creator={{
                name: challenge.creator_username,
                avatar:
                  "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&w=50&q=80",
              }}
            />
          ))}
        </div>
      )}

      {!loading && filteredChallenges.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p className="text-neutral-gray">
            {search || selectedCategoryIds.length > 0
              ? "چالشی با این فیلترها یافت نشد"
              : isMyChallengesSelected
                ? "شما هیچ چالشی نساخته‌اید"
                : "شما در هیچ چالشی شرکت نکرده‌اید"}
          </p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-2.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-neutral-gray rounded-lg h-80">
              <div className="h-40 bg-neutral-gray rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-neutral-gray rounded w-3/4"></div>
                <div className="h-3 bg-neutral-gray rounded w-full"></div>
                <div className="h-3 bg-neutral-gray rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileChallenges;
