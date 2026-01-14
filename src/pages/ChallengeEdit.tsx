import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "@/components/Custom/CustomButton";
import SearchBar from "@/components/ChallengeManagement/public/SearchBar";
import UserCardList from "@/components/ChallengeManagement/public/UserCardsList";
import BackButton from "@/components/ChallengeManagement/edit/BackButton";
import ImageAndBadgeContainerEdit from "@/components/ChallengeManagement/edit/ImageAndBadgeContainerEdit";
import TitleAndDescriptionInput from "@/components/ChallengeManagement/edit/TitleAndDescriptionInput";
import DateAndLocationInput from "@/components/ChallengeManagement/edit/DateAndLocationInput";
import type { UserProfile } from "@/types/userTypes";
import type { ChallengeData } from "@/types/challengeElementsTypes";

const DEFAULT_IMG =
  "https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2024/04/mount-everest-at-sunset.jpg";

const ChallengeEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = (location.state?.challenge as ChallengeData) ?? {};

  if (!incoming) {
    return <div>Challenge not found!</div>;
  }

  const {
    Img = DEFAULT_IMG,
    title = "عنوان چالش",
    description = "توضیحات چالش...",
    dateRange = "تاریخ چالش",
    location: challengeLocation = "مکان چالش",
    members: participants = [],
    commentsEnabled = false,
    categories = [],
    type = "عمومی",
    memberCount = "0",
  } = incoming;

  const [image, setImage] = useState(Img);
  const [users, setUsers] = useState<UserProfile[]>(participants);
  const [searchTerm, setSearchTerm] = useState("");
  const [challengeTitle, setChallengeTitle] = useState(title);
  const [challengeDescription, setChallengeDescription] = useState(description);
  const [challengeDate, setChallengeDate] = useState(dateRange);
  const [challengeLocationState, setChallengeLocation] = useState(challengeLocation);

  const handleDelete = (id: string, username: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    console.log(`${username} has been removed.`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleTitleChange = (value: string) => {
    setChallengeTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    setChallengeDescription(value);
  };

  const handleDateChange = (value: string) => {
    setChallengeDate(value);
  };

  const handleLocationChange = (value: string) => {
    setChallengeLocation(value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredUsers = users.filter(
    (user: UserProfile) =>
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFinishEditing = () => {
    const updatedChallenge: ChallengeData = {
      ...incoming, // keep everything not edited
      Img: image,
      title: challengeTitle,
      description: challengeDescription,
      dateRange: challengeDate,
      location: challengeLocationState,
      members: users,
      memberCount: users.length.toString(),
      commentsEnabled,
      categories,
      type,
    };

    navigate("/challenge", {
      state: { challenge: updatedChallenge },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex-1 flex flex-col justify-start items-center w-full">
        <div className="flex justify-between w-full items-center max-w-xl">
          <BackButton onClick={handleBack} />
        </div>

        <ImageAndBadgeContainerEdit
          onImageChange={handleImageChange}
          imageUrl={image}
        />

        <div className="w-full max-w-xl">
          <TitleAndDescriptionInput
            title={challengeTitle}
            onTitleChange={handleTitleChange}
            description={challengeDescription}
            onDescriptionChange={handleDescriptionChange}
          />
        </div>

        <div className="space-y-4 mb-4 text-right w-full max-w-xl">
          <DateAndLocationInput
            challengeDate={challengeDate}
            challengeLocation={challengeLocationState}
            onDateChange={handleDateChange}
            onLocationChange={handleLocationChange}
          />
        </div>

        <div className="text-right mb-1 mt-6 max-w-2xl w-full" dir="rtl">
          <h2 className="text-xl font-semibold text-black mb-4">
            شرکت کنندگان
          </h2>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
        />

        <UserCardList
          users={filteredUsers}
          onDelete={handleDelete}
          isOwner={true}
        />
      </div>

      <div className="flex justify-center w-full mt-10">
        <CustomButton
          className="w-full sm:w-full md:w-full max-w-xl bg-primary rounded-primary-radius p-5 text-lg sm:text-lg md:text-lg hover:bg-primary"
          onClick={handleFinishEditing}
        >
          اتمام ویرایش
        </CustomButton>
      </div>
    </div>
  );
};

export default ChallengeEdit;