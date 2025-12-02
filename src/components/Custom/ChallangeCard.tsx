import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ThumbsUp,
  MessageCircle,
  Share,
  Bookmark,
  Lock,
  LockOpen,
} from "lucide-react";
import CustomBtn from "@/components/Custom/CustomBtn";
import type { ChallengeCardProps } from "@/types/challengeCardTypes";
import { LikeService, UnlikeService } from "@/services/userService";

export default function ChallengeCard({
  id,
  title,
  description = "",
  startDate,
  endDate,
  profiles = [],
  initialLikes = 0,
  initialComments = 0,
  coverImage = "/images/sample-cover.jpg",
  isJoined = true,
  creator,
  isPrivate = false,
  daysOfWeek = ["شنبه", "یکشنبه"],
  onClick,
}: ChallengeCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments] = useState(initialComments);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = async () => {
    try {
      const response = await LikeService({
        entity_type: "challenge",
        entity_id: id,
      });

      setLikes((prev) => prev + 1);
      setIsLiked(true);

      return response?.data || response;
    } catch (error) {
      console.error("Error liking challenge:", error);
      return null;
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await UnlikeService({
        entity_type: "challenge",
        entity_id: id,
      });

      setLikes((prev) => Math.max(prev - 1, 0));
      setIsLiked(false);

      return response?.data || response;
    } catch (error) {
      console.error("Error unliking challenge:", error);
      return null;
    }
  };

  const toggleLike = () => {
    if (isLiked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: description,
          url: `${window.location.origin}/challenge/${id}`,
        })
        .catch((err) => console.error("خطا در اشتراک‌گذاری:", err));
    }
  }, [title, description]);

  const handleSave = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, []);

  const displayProfiles = profiles.slice(0, 3);
  const remainingProfiles = profiles.length > 3 ? profiles.length - 3 : 0;

  return (
    <Card
      className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-shadow-strong hover:shadow-xl transition-shadow duration-300 border-2 border-black bg-white"
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row">
        {/* === تصویر === */}
        <div
          className="w-full md:w-2/5 relative flex-shrink-0 h-40 md:h-auto bg-neutral-gray cursor-pointer"
          onClick={onClick}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-gray to-neutral-gray-bold animate-pulse" />
          )}
          <img
            src={coverImage}
            alt={`تصویر چالش ${title}`}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* آواتارها */}
          {profiles.length > 0 && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {displayProfiles.map((profile, index) => (
                  <Avatar
                    key={`${profile.id || index}`}
                    className="relative h-8 w-8 border-2 border-primary shadow-md hover:scale-110 transition-transform"
                    style={{ zIndex: displayProfiles.length - index }}
                  >
                    <AvatarImage
                      src={profile.avatar || profile.image}
                      alt={profile.name}
                    />
                    <AvatarFallback className="bg-white text-neutral-gray-bold text-xs">
                      {profile.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {remainingProfiles > 0 && (
                  <div className="relative h-8 w-8 border-2 border-white bg-neutral-gray text-neutral-gray-bold text-xs flex items-center justify-center rounded-full shadow-md font-semibold">
                    +{remainingProfiles}
                  </div>
                )}
              </div>

              <span className="text-xs text-white bg-secondary px-2 py-1 rounded-full whitespace-nowrap">
                {profiles.length} نفر
              </span>
            </div>
          )}

          <div className="absolute bottom-4 right-4">
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 shadow-shadow-strong ${
                isJoined
                  ? "bg-success text-white border-success"
                  : "bg-white text-neutral-gray-bold border-neutral-gray"
              }`}
            >
              {isJoined ? "عضو شده‌اید ✓" : "عضو نشده‌اید"}
            </span>
          </div>
        </div>

        {/* === محتوا === */}
        <div className="md:w-3/5 flex flex-col justify-between p-4 md:p-5 w-full">
          <div className="cursor-pointer" onClick={onClick}>
            {/* هدر */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-11 w-11 border-2 border-primary shadow-md ring-2 ring-primary/10">
                  <AvatarImage src={creator?.avatar} alt={creator?.name} />
                  <AvatarFallback>
                    {creator?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-black text-sm truncate">
                    {creator?.name || "کاربر ناشناس"}
                  </span>
                  <span className="text-xs text-neutral-gray">ایجاد‌کننده</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isPrivate ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <LockOpen className="h-4 w-4" />
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // جلوی کلیک پدر رو می‌گیرد
                    handleSave();
                  }}
                  className={`p-2 rounded-full transition-all duration-200 border-2 shadow-lg hover:scale-105 ${
                    isSaved
                      ? "bg-save-color text-primary border-primary"
                      : "bg-white text-neutral-gray-bold border-black"
                  }`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      isSaved
                        ? "fill-primary stroke-primary"
                        : "stroke-neutral-gray-bold"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* عنوان و توضیحات */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-black mb-2 line-clamp-2">
                {title}
              </h2>
              <p className="text-neutral-gray-bold text-sm leading-relaxed line-clamp-3">
                {description || "بدون توضیحات"}
              </p>
            </div>

            {/* اطلاعات */}
            <div className="flex flex-wrap gap-6 text-sm mb-4 pb-4 border-b border-neutral-gray">
              <div>
                <span className="text-neutral-gray-bold text-xs font-medium block mb-1">
                  تاریخ شروع
                </span>
                <span className="text-black font-bold">{startDate}</span>
              </div>

              <div>
                <span className="text-neutral-gray-bold text-xs font-medium block mb-1">
                  تاریخ پایان
                </span>
                <span className="text-black font-bold">{endDate}</span>
              </div>

              <div>
                <span className="text-neutral-gray-bold text-xs font-medium block mb-1">
                  نظرات
                </span>
                <div className="flex items-center gap-1.5 text-black font-bold">
                  <MessageCircle className="h-4 w-4" />
                  <span>{comments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* لایک و اشتراک */}
          <div className="flex items-center gap-3">
            <CustomBtn onClick={toggleLike}>
              <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
              <span>{likes}</span>
            </CustomBtn>

            <CustomBtn onClick={handleShare}>
              <Share className="h-4 w-4" />
            </CustomBtn>
          </div>
        </div>
      </div>
    </Card>
  );
}
