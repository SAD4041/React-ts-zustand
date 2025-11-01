import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Lock,
  ThumbsUp,
  Calendar,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
import CustomBtn from "@/components/Custom/CustomBtn";

interface Profile {
  id: number;
  image: string;
  fallback: string;
}

interface ChallengeCardProps {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profiles: Profile[];
  initialLikes?: number;
  initialComments?: number;
  coverImage?: string;
  isPrivate?: boolean;
  isJoined?: boolean;
  creator?: {
    name: string;
    avatar: string;
  };
}

export default function ChallengeCard({
  title,
  description = "",
  startDate,
  endDate,
  profiles = [],
  initialLikes = 0,
  initialComments = 0,
  coverImage = "/images/sample-cover.jpg",
  isPrivate = false,
  isJoined = true,
  creator,
}: ChallengeCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    navigator.share?.({
      title: title,
      text: description,
      url: window.location.href,
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const shortDescription =
    description.length > 120 ? description.slice(0, 120) + "..." : description;

  return (
    <Card
      className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white mb-4"
      dir="rtl"
    >
      {/* هدر کارت - اطلاعات سازنده */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[var(--primary)]">
              <AvatarImage src={creator?.avatar} />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                {creator?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-sm">
                {creator?.name || "کاربر ناشناس"}
              </span>
              <span className="text-xs text-gray-500">ایجاد کننده چالش</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full transition-all duration-200 border  ${
                isSaved
                  ? "bg-amber-100 text-amber-600 border-[var(--primary)] "
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-[var(--secondry)]"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isSaved
                    ? "fill-amber-600 stroke-[var(--primary)]"
                    : "stroke-[var(--secondry)]"
                }
                `}
              />
            </button>
          </div>
        </div>
      </div>

      {/* محتوای چالش */}
      <CardContent className="p-0">
        {/* تصویر چالش */}
        <div className="relative h-72 bg-gray-100 overflow-hidden">
          {/* اسکلت بارگذاری */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}

          {/* تصویر اصلی */}
          <div
            className={`relative w-full h-full transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={coverImage}
              alt="Challenge Cover"
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Overlay تیره برای خوانایی بهتر متن */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* عنوان و توضیحات روی تصویر */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="text-white font-bold text-xl mb-2">{title}</div>

              {shortDescription && (
                <p className="text-white text-sm leading-relaxed">
                  {shortDescription}
                </p>
              )}
            </div>
          </div>

          {/* وضعیت عضویت */}
          <div className="absolute top-4 left-4 flex items-center gap-1">
            {isJoined ? (
              <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200 flex items-center gap-1">
                ✓ عضو شده‌اید
                {isPrivate && <Lock className="h-3 w-3 text-green-700" />}
              </span>
            ) : (
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 flex items-center gap-1">
                چالش جدید
                {isPrivate && <Lock className="h-3 w-3 text-blue-700" />}
              </span>
            )}
          </div>

          {/* آواتارهای شرکت‌کنندگان */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="flex -space-x-2" dir="rtl">
              {profiles.slice(0, 3).map((profile, index) => (
                <Avatar
                  key={profile.id}
                  className="relative h-8 w-8 border-1 border-[var(--secondry)] shadow-sm transition-transform hover:scale-110"
                  style={{ zIndex: profiles.length - index }}
                >
                  <AvatarImage src={profile.image} />
                  <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                    {profile.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              {profiles.length > 3 && (
                <Avatar className="relative h-8 w-8 border-1 border-[var(--secondry)] bg-gray-100 text-black text-xs flex items-center justify-center shadow-sm">
                  +{profiles.length - 3}
                </Avatar>
              )}
            </div>

            {/* تعداد کل نفرات فقط اگر 3 یا کمتر باشد */}
            {profiles.length > 0 && (
              <span className="text-xs text-white bg-[var(--secondry)] px-2 py-1 rounded-full border border-black">
                {profiles.length} نفر
              </span>
            )}
          </div>
        </div>

        {/* اطلاعات پایین */}
        <div className="p-4" dir="rtl">
          {/* تاریخ‌ها */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex flex-col items-end" dir="ltr">
                <span className="text-gray-500 text-xs">شروع</span>
                <span className="text-gray-900 font-bold">{startDate}</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex flex-col items-end" dir="ltr">
                <span className="text-gray-500 text-xs">پایان</span>
                <span className="text-gray-900 font-bold">{endDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </CardContent>

      {/* فوتر - اقدامات تعاملی */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white" dir="ltr">
        {/* آمار تعاملات */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-xs">
            <div
              className={`flex items-center gap-1 ${
                isLiked ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>{likes} پسندیدند</span>
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="h-3 w-3" />
              <span>{comments} نظر</span>
            </div>
          </div>

          {/* دکمه‌های اقدام سریع */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isLiked
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp
                className={`h-4 w-4 ${isLiked ? "fill-[var(--secondry)]" : ""}`}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
            >
              <Share className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* دکمه عضویت اصلی */}
        <div>
          <CustomBtn
            children={
              isJoined ? "مشاهده پیشرفت" : "عضویت در چالش"
            }
          />
        </div>
      </div>
    </Card>
  );
}
