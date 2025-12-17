import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { Search } from "lucide-react";
import ChallengeCard from "../Custom/ChallangeCard";
import CustomInput from "../Custom/CustomInput";
import CustomDropdown from "../Custom/CustomDropdown";
import { useNavigate } from "react-router-dom";

import {
  getParticipatingChallengesService,
  getMutualFollowersService,
  searchChallengesService,
} from "@/services/userService";

import type { Challenge } from "@/types/challengeTypes";
import { convertToJalali } from "../Custom/ConvertToJalali";

const ProfileChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedCategories, setCheckedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "ورزشی" },
    { id: 2, name: "هنری" },
    { id: 3, name: "علمی" },
    { id: 4, name: "تفریحی" },
    { id: 0, name: "چالش‌های من" }, // فقط UI ـه، سرچ/لیست اینجا طبق خواسته تو فقط participating هست
  ];

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

  const hydrateChallenges = async (list: Challenge[]) => {
    return Promise.all(
      list.map(async (ch) => {
        const mutualFollowers = await fetchMutualFollowers(ch.id);
        return { ...ch, mutualFollowers };
      })
    );
  };

  // ----- اگر سرچ خالی بود: getParticipatingChallengesService -----
  const fetchParticipatingChallenges = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getParticipatingChallengesService();
      const data = await hydrateChallenges(response);

      setChallenges(data);
    } catch (err) {
      setError("خطا در دریافت چالش‌ها");
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  // ----- اگر سرچ داشت: searchChallengesService (بدون فیلتر/سورت فرانت) -----
  const fetchSearchedChallenges = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchChallengesService(query);
      const list: Challenge[] = response?.data ?? response ?? [];
      const data = await hydrateChallenges(list);

      setChallenges(data);
    } catch (error) {
      console.error("Error searching challenges:", error);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  // ----- تصمیم‌گیری: اگر چیزی سرچ نشده بود participating، اگر سرچ شده بود search ----- 
  useEffect(() => {
    const q = searchQuery.trim();
    if (q) fetchSearchedChallenges(q);
    else fetchParticipatingChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // ----- منطق چک‌باکس دسته‌بندی‌ها (مثل کد خودت) -----
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

  // ✅ طبق خواسته تو سرچ/لیست از بک میاد و روی فرانت فیلتر/سورت انجام نمی‌دیم
  const filteredChallenges = challenges;

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-error text-center">
          <p>{error}</p>
          <button
            onClick={() => {
              const q = searchQuery.trim();
              if (q) fetchSearchedChallenges(q);
              else fetchParticipatingChallenges();
            }}
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
            onSubmit={(v) => setSearchQuery(v.challengeSearch || "")}
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
            {searchQuery
              ? "چالشی با این عبارت یافت نشد"
              : "شما در هیچ چالشی شرکت نکرده‌اید"}
          </p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-2.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-neutral-gray rounded-lg h-80"
            >
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
