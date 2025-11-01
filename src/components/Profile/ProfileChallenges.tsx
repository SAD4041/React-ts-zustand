import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Search } from "lucide-react";
import ChallengeCard from "../Custom/ChallangeCard"; // مسیر درست به ChallengeCard خودت
import CustomInput from "../Custom/CustomInput";
import CustomDropdown from "../Custom/CustomDropdown";

const ProfileChallenges = () => {
  // داده نمونه چالش‌ها با تصاویر Unsplash
  const challenges = [
    {
      id: 1,
      name: "چالش یک",
      categoryID: 1,
      category: "ورزشی",
      coverImage:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "چالش دو",
      categoryID: 1,
      category: "ورزشی",
      coverImage:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "چالش سه",
      categoryID: 1,
      category: "ورزشی",
      coverImage:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "چالش چهار",
      categoryID: 3,
      category: "علمی",
      coverImage:
        "https://images.unsplash.com/photo-1581091215366-5df51b1b48fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "چالش پنج",
      categoryID: 2,
      category: "هنری",
      coverImage:
        "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "چالش شش",
      categoryID: 4,
      category: "تفریحی",
      coverImage:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const loading = false;

  const categories = [
    { id: 1, name: "ورزشی" },
    { id: 2, name: "هنری" },
    { id: 3, name: "علمی" },
    { id: 4, name: "تفریحی" },
  ];

  const [checkedCategories, setCheckedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [search, setSearch] = useState("");

  // دسته‌بندی انتخاب‌شده
  const selectedCategoryIds = Object.keys(checkedCategories)
    .filter((key) => checkedCategories[Number(key)])
    .map(Number);

  // فیلتر جستجو
  const searchedChallenges = search
    ? challenges
        .filter((challenge) =>
          challenge.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const s = search.toLowerCase();
          const score = (name: string) => {
            if (name === s) return 3;
            if (name.startsWith(s)) return 2;
            return 1;
          };
          return score(bName) - score(aName);
        })
    : challenges;

  // فیلتر بر اساس دسته‌بندی
  const filteredChallenges =
    selectedCategoryIds.length === 0
      ? searchedChallenges
      : searchedChallenges.filter((ch) =>
          selectedCategoryIds.includes(ch.categoryID)
        );

  // نمونه تصاویر آواتار
  const sampleAvatars = [
    "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&w=50&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=50&q=80",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=50&q=80",
    "https://images.unsplash.com/photo-1544005313-2f8f0f2d8b0f?auto=format&fit=crop&w=50&q=80",
  ];

  const getRandomAvatars = () => {
    const count = Math.floor(Math.random() * 5) + 1; // 1 تا 5 آواتار
    const shuffled = sampleAvatars.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((img, idx) => ({
      id: idx + 1,
      image: img,
      fallback: String.fromCharCode(65 + idx), // A,B,C...
    }));
  };

  return (
    <>
      {/* جستجو و فیلتر دسته‌بندی */}
      <div className="flex justify-start items-center w-full sm:w-126 md:w-139 m-2.5 gap-1">
        <div className="w-2/3">
          <Formik
            initialValues={{ challengeSearch: "" }}
            onSubmit={(values) => setSearch(values.challengeSearch)}
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
                  className="pr-10"
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-1/3">
          <CustomDropdown
            items={categories}
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
          />
        </div>
      </div>

      {/* نمایش چالش‌ها */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 m-2.5">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.name}
              description={`این توضیح نمونه برای چالش ${challenge.name} است.`}
              startDate="1402/01/01"
              endDate="1402/01/30"
              profiles={getRandomAvatars()}
              initialLikes={Math.floor(Math.random() * 100)}
              coverImage={challenge.coverImage}
              isPrivate={Math.random() < 0.3} // بعضی کارت‌ها خصوصی
            />
          ))}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 m-2.5">
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="cursor-pointer m-1 hover:shadow-2xl transition"
            >
              <p>Loading...</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileChallenges;
