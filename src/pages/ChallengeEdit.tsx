// src/pages/ChallengeEdit.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "@/components/Custom/CustomButton";
import SearchBar from "@/components/ChallengeManagement/public/SearchBar";
import UserCardList from "@/components/ChallengeManagement/public/UserCardsList";
import BackButton from "@/components/ChallengeManagement/edit/BackButton";
import ImageAndBadgeContainerEdit from "@/components/ChallengeManagement/edit/ImageAndBadgeContainerEdit";
import TitleAndDescriptionInput from "@/components/ChallengeManagement/edit/TitleAndDescriptionInput";
import DateAndLocationInput from "@/components/ChallengeManagement/edit/DateAndLocationInput";
import CustomToast from "@/components/Custom/CustomToast";
import useUserStore from "@/store/userStore/userStore";
import type { UserProfile } from "@/types/userTypes";

import {
  fetchChallengeById,
  updateChallenge,
  removeParticipantFromChallenge,
} from "@/services/challengeService";
import type { ChallengeData } from "@/types/challengeCreateTypes";

import { DEFAULT_IMG } from "@/data/mockImages";



const ChallengeEdit: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { token, userId } = useUserStore();

  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(false);

  const [image, setImage] = useState<string>(DEFAULT_IMG);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [challengeLocation, setChallengeLocation] = useState("");
  const [participants, setParticipants] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadChallenge = async () => {
      if (!challengeId || !token || !userId) {
        CustomToast("لطفاً وارد حساب کاربری شوید", "error");
        navigate(-1);
        return;
      }

      try {
        const data: ChallengeData = await fetchChallengeById(challengeId);

        if (data.creator_id !== Number(userId)) {
          CustomToast("شما اجازه ویرایش این چالش را ندارید", "error");
          navigate(`/challenge/${challengeId}`);
          return;
        }

        setIsCreator(true);
        setChallenge(data);

        // پر کردن فرم
        setChallengeTitle(data.title);
        setChallengeDescription(data.description || "");
        setImage(data.image_url || DEFAULT_IMG);
        setChallengeLocation(data.location || "");

        setStartDate(data.start_time.split("T")[0]);
        setStartTime(data.start_time.split("T")[1]?.slice(0, 5) || "09:00");
        setEndDate(data.end_time.split("T")[0]);
        setEndTime(data.end_time.split("T")[1]?.slice(0, 5) || "18:00");

        // حذف خود کاربر از لیست شرکت‌کنندگان
        const others = data.participants.filter(p => p.user_id !== Number(userId));
        setParticipants(others);
      } catch (err) {
        CustomToast("خطا در بارگذاری چالش", "error");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [challengeId, token, userId, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteParticipant = async (participantId: string | number) => {
    if (!challengeId) return;

    try {
      await removeParticipantFromChallenge(challengeId, participantId);
      setParticipants(prev => prev.filter(u => u.user_id !== Number(participantId)));
      CustomToast("کاربر با موفقیت حذف شد", "success");
    } catch (err: any) {
      CustomToast(err.message || "حذف ناموفق بود", "error");
    }
  };

  const handleSave = async () => {
    if (!challengeTitle.trim()) {
      CustomToast("عنوان چالش الزامی است", "error");
      return;
    }
    if (!startDate || !startTime || !endDate || !endTime) {
      CustomToast("تاریخ و زمان شروع و پایان الزامی است", "error");
      return;
    }

    setIsSaving(true);

    const payload = {
      title: challengeTitle.trim(),
      description: challengeDescription.trim(),
      image_url: image !== DEFAULT_IMG ? image : null,
      location: challengeLocation.trim() || null,
      start_time: `${startDate}T${startTime}:00Z`,
      end_time: `${endDate}T${endTime}:59Z`,
      timezone: "UTC",
    };

    try {
      await updateChallenge(challengeId!, payload);
      CustomToast("چالش با موفقیت بروزرسانی شد!", "success");
      navigate(`/challenge/${challengeId}`, { replace: true });
    } catch (err: any) {
      CustomToast(err.message || "ذخیره تغییرات ناموفق بود", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredParticipants = participants.filter(
    user =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-neutral-gray-bold">در حال بارگذاری چالش...</p>
        </div>
      </div>
    );
  }
  if (!challenge || !isCreator) return null;

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex-1 flex flex-col justify-start items-center w-full">
        <div className="flex justify-between w-full items-center max-w-xl mb-6">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="text-2xl font-bold text-primary">ویرایش چالش</h1>
        </div>

        <ImageAndBadgeContainerEdit onImageChange={handleImageChange} imageUrl={image} />

        <div className="w-full max-w-xl space-y-6 mt-6">
          <TitleAndDescriptionInput
            title={challengeTitle}
            onTitleChange={setChallengeTitle}
            description={challengeDescription}
            onDescriptionChange={setChallengeDescription}
          />

          <DateAndLocationInput
            startDate={startDate}
            startTime={startTime}
            endDate={endDate}
            endTime={endTime}
            location={challengeLocation}
            onStartDateChange={setStartDate}
            onStartTimeChange={setStartTime}
            onEndDateChange={setEndDate}
            onEndTimeChange={setEndTime}
            onLocationChange={setChallengeLocation}
          />

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-right">
              شرکت‌کنندگان ({participants.length} نفر)
            </h2>
            {participants.length > 0 ? (
              <>
                <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
                <UserCardList
                  users={filteredParticipants}
                  onDelete={handleDeleteParticipant}
                  isOwner={true}
                />
              </>
            ) : (
              <p className="text-center text-primary py-8 rounded-xl">
                هنوز کسی عضو چالش نشده است
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mt-10">
        <CustomButton
          disabled={isSaving}
          onClick={handleSave}
          className="w-full max-w-xl bg-primary text-white rounded-primary-radius p-5 text-lg disabled:opacity-70"
        >
          {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </CustomButton>
      </div>
    </div>
  );
};

export default ChallengeEdit;