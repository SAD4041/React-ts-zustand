import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import BackButtonWithSteps from "@/components/ChallengeManagement/create/BackButtonWithSteps";
import CustomButton from "@/components/Custom/CustomButton";

import Step1BasicInfo from "@/components/ChallengeManagement/create/CreationStepOne";
import Step2Details from "@/components/ChallengeManagement/create/CreationStepTwo";
import Step3Members from "@/components/ChallengeManagement/create/CreationStepThree";

import type { UserProfile } from "@/types/userTypes";
import type { ChallengeData } from "@/types/challengeElementsTypes";

const ChallengeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // ── Step 1 ─────────────────────────────────────
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // ── Step 2 ─────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState("");

  // ── Step 3 ─────────────────────────────────────
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserProfile[]>([]);
  const [memberLimitError, setMemberLimitError] = useState(false);

  const mockUsers: UserProfile[] = [
    {
      id: "1",
      username: "Alice",
      imagePath: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "Passionate about climbing and adventure.",
      followersCount: 120,
      followingCount: 80,
      doneChallengesCount: 5,
    },
    {
      id: "4",
      username: "Damon",
      imagePath: "https://randomuser.me/api/portraits/men/3.jpg",
      bio: "Passionate about climbing and adventure.",
      followersCount: 120,
      followingCount: 80,
      doneChallengesCount: 5,
    },
    {
      id: "5",
      username: "ching chang chong",
      imagePath: "https://randomuser.me/api/portraits/women/2.jpg",
      bio: "Passionate about climbing and adventure.",
      followersCount: 120,
      followingCount: 80,
      doneChallengesCount: 5,
    },
    {
      id: "2",
      username: "Bob",
      imagePath: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Love hiking and nature.",
      followersCount: 150,
      followingCount: 100,
      doneChallengesCount: 7,
    },
    {
      id: "3",
      username: "Charlie",
      imagePath: "https://randomuser.me/api/portraits/men/2.jpg",
      bio: "Fitness enthusiast and challenge seeker.",
      followersCount: 180,
      followingCount: 90,
      doneChallengesCount: 6,
    },
  ];

  const mockCategories = [
    "ورزش",
    "سلامت",
    "آموزش",
    "محیط زیست",
    "فرهنگ",
    "تکنولوژی",
    "هنر",
    "غذا",
  ];

  const filteredCategories = mockCategories.filter(
    (c) => c.includes(categorySearch) && !selectedCategories.includes(c)
  );

  const availableUsers = useMemo(() => {
    return mockUsers
      .filter((u) => !selectedUsers.some((s) => s.id === u.id))
      .filter((u) =>
        u.username.toLowerCase().includes(userSearch.toLowerCase())
      );
  }, [selectedUsers, userSearch]);

  const handleBack = () =>
    currentStep === 1 ? navigate(-1) : setCurrentStep((s) => s - 1);
  const handleNext = () => currentStep < 3 && setCurrentStep((s) => s + 1);

  const addUser = (user: UserProfile, memberCount: string) => {
    const limit = parseInt(memberCount) || 0;
    if (selectedUsers.some((u) => u.id === user.id)) return;
    if (selectedUsers.length >= limit) {
      setMemberLimitError(true);
      setTimeout(() => setMemberLimitError(false), 3000);
      return;
    }
    setSelectedUsers((p) => [...p, user]);
    setUserSearch("");
  };
  const removeUser = (id: string) =>
    setSelectedUsers((p) => p.filter((u) => u.id !== id));

  const handleFinish = (values: any) => {
    const newChallenge: ChallengeData = {
      title: challengeTitle,
      description: challengeDescription,
      dateRange: values.challengeDate,
      location: values.challengeLocation,
      Img: image,
      commentsEnabled: values.isCommentsEnabled,
      categories: selectedCategories,
      type: values.challengeType,
      memberCount: values.memberCount,
      members: selectedUsers,
    };
    console.log("Sending to /challenge:", newChallenge);
    navigate("/challenge", { state: { challenge: newChallenge } });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 items-center">
      <div className="flex justify-center items-center w-full max-w-xl mb-10 mt-4">
        <BackButtonWithSteps onClick={handleBack} />
        <div className="flex justify-end flex-1">
          <span className="text-primary text-3xl font-bold">ساخت چالش</span>
        </div>
      </div>

      <Formik
        initialValues={{
          challengeDate: "",
          challengeLocation: "",
          isCommentsEnabled: false,
          challengeType: "عمومی",
          memberCount: "",
        }}
        enableReinitialize
        onSubmit={(values) => currentStep === 3 && handleFinish(values)}
      >
        {({ values, setFieldValue }) => {
          const canAddMore =
            selectedUsers.length < (parseInt(values.memberCount) || 0);

          return (
            <Form className="flex-1 flex flex-col mt-10 justify-start items-center w-full">
              {/* ── STEP COMPONENTS ── */}
              {currentStep === 1 && (
                <Step1BasicInfo
                  title={challengeTitle}
                  description={challengeDescription}
                  image={image}
                  onTitleChange={setChallengeTitle}
                  onDescriptionChange={setChallengeDescription}
                  onImageChange={setImage}
                />
              )}

              {currentStep === 2 && (
                <Step2Details
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  categorySearch={categorySearch}
                  setCategorySearch={setCategorySearch}
                  filteredCategories={filteredCategories}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}

              {currentStep === 3 && (
                <Step3Members
                  values={values}
                  userSearch={userSearch}
                  setUserSearch={setUserSearch}
                  selectedUsers={selectedUsers}
                  removeUser={removeUser}
                  availableUsers={availableUsers}
                  addUser={(u) => addUser(u, values.memberCount)}
                  canAddMore={canAddMore}
                  memberLimitError={memberLimitError}
                />
              )}

              <div className="flex justify-center w-full mt-10">
                <CustomButton
                  type={currentStep === 3 ? "submit" : "button"}
                  onClick={currentStep < 3 ? handleNext : undefined}
                  className={
                    currentStep === 3
                      ? "w-full sm:w-full md:w-full max-w-xl bg-primary rounded-[8px] p-5 text-lg hover:bg-primary"
                      : "w-full sm:w-full md:w-full max-w-xl bg-secondary rounded-[8px] p-5 text-lg hover:bg-secondary"
                  }
                >
                  {currentStep === 3 ? "ثبت چالش" : "بعدی"}
                </CustomButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChallengeCreate;
