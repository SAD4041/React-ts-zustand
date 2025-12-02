import TertiaryCustomButton from "@/components/Custom/TertiaryCustomButton";
import { mockposts, mutualCommenters, mutualLikers } from "@/data/mockPosts";
import { Card, CardContent } from "@/components/ui/card";
import useUserStore from "@/store/userStore/userStore";
import convertToPersianDigits from "@/utils/convertToPersianDigits";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ClipboardCheck, Heart, MessageCircle, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInitials } from "@/components/Profile/ProfileHeader/ProfileHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  getChallengesWithIdService,
  getParticipatingChallengesService,
  getPostService,
  LikeService,
  UnlikeService,
} from "@/services/postService";
import { set } from "react-hook-form";
import type { ChallengePreview, PostResponse } from "@/types/postTypes";
import { timeAgo } from "@/utils/timeAgoDiff";
import { Skeleton } from "@/components/ui/skeleton";
import CustomBtn from "@/components/Custom/CustomBtn";

const PostPage = () => {
  const { id } = useParams();
  const postId = Number(id);
  const postmock = mockposts.find((p) => p.id === postId);
  const navigate = useNavigate();

  if (!postmock) {
    return <div>No post found with this id!</div>;
  }
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isExpanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false); //put skeleton -----------------------------------------------
  const [postData, setPostData] = useState<PostResponse>();
  const maxChars = postmock.imageUrl.length > 0 ? 75 : 500;
  const text = isExpanded
    ? postData?.description
    : postData?.description?.substring(0, maxChars);
  //hard code meow
  const { username } = useUserStore.getState();
  const initials = getUserInitials(username);
  const personalColor = "bg-secondary text-white";

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getPostService(postId);
        setPostData(post);

        setIsLiked(post.is_liked);
        setLikeCount(post.like_count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleLikeToggle = async () => {
    if (!postData) return;
    try {
      if (isLiked) {
        // Unlike
        await UnlikeService({ entity_type: "post", entity_id: postData.id });
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        // Like
        await LikeService({ entity_type: "post", entity_id: postData.id });
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const [challenge, setChallenge] = useState<ChallengePreview | null>(null);
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        if (postData?.challenge_id) {
          const challenge = await getChallengesWithIdService(
            postData.challenge_id
          );
          setChallenge(challenge);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchChallenge();
  }, [postData?.challenge_id]);

  const isLikeMode = mutualLikers.length > 0;
  const activeProfiles = isLikeMode ? mutualLikers : mutualCommenters;

  const textLabel = isLikeMode ? "پسندیده شده توسط" : "نظر داده شده توسط";

  if (postmock.imageUrl && postmock.imageUrl.length > 0) {
    //skeleton loading
    if (loading) {
      return (
        <div className="w-full flex justify-center p-4">
          <div className="w-full max-w-md relative">
            {/* Top User Info */}
            <div className="w-full flex items-center gap-3 mb-[10px]" dir="rtl">
              {/* Avatar */}
              <Skeleton className="w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[115px] md:h-[115px] rounded-full" />

              <div className="flex flex-col gap-2 translate-y-[2px] w-1/2">
                <Skeleton className="h-4 w-1/2" /> {/* username */}
                <Skeleton className="h-3 w-2/3" /> {/* time */}
              </div>
              <div className="">
                {/* Placeholder for potential action buttons */}
                <TertiaryCustomButton className="text-primary">
                  loading..
                </TertiaryCustomButton>
              </div>
            </div>

            {/* Card Skeleton */}
            <Card className="w-full max-w-md rounded-[12.5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden">
              {/* Image Carousel Skeleton */}
              <div className="w-full">
                <Skeleton className="w-full h-[350px] sm:h-[400px] md:h-[450px]" />
              </div>

              <CardContent className="pt-4 pb-6 relative">
                {/* Challenge Tag */}
                <div
                  className="gap-[4px] flex items-center mb-[16px]"
                  dir="rtl"
                >
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Like + Comment */}
                <div
                  className="flex items-center gap-[16px] mb-[25px]"
                  dir="rtl"
                >
                  <div className="gap-[4px] flex items-center">
                    <Skeleton className="h-8 w-20 rounded-md" />{" "}
                    {/* Like Button */}
                    <Skeleton className="h-4 w-6" /> {/* Like Count */}
                  </div>

                  <div className="gap-[4px] flex items-center">
                    <Skeleton className="h-8 w-20 rounded-md" />{" "}
                    {/* Comment Button */}
                    <Skeleton className="h-4 w-6" /> {/* Comment Count */}
                  </div>
                </div>

                {/* Divider Line */}
                <Skeleton className="w-full h-[1px] mb-3" />

                {/* Caption */}
                <div className="flex justify-end mt-3 mb-[5px]">
                  <div className="flex items-center gap-2" dir="rtl">
                    {/* Overlapping avatars */}
                    <div className="flex -space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>

                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>

                {/* Description text */}
                <div dir="rtl" className="flex flex-col gap-2 mt-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  {/* <Skeleton className="h-4 w-2/3" /> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full flex justify-center p-4">
        <div className="w-full max-w-md relative">
          <div className="w-full flex items-center gap-3 mb-[10px]" dir="rtl">
            <Avatar
              className="w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[115px] md:h-[115px]
                    rounded-full overflow-hidden"
            >
              <AvatarImage
                alt={username}
                src="https://samanskh.github.io/assets/images/bio-photo.jpg"
                className="object-cover w-full h-full"
              />
              <AvatarFallback
                className={`text-2xl font-semibold ${personalColor} flex items-center justify-center w-full h-full rounded-full`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div dir="rtl" className="flex flex-col gap-2 translate-y-[2px]">
              <p className="text-sm sm:text-base font-semibold text-black">
                {username}
              </p>
              <p
                dir="rtl"
                className="text-xs text-neutral-gray-bold font-semibold"
              >
                {convertToPersianDigits(timeAgo(postData?.created_at || ""))}
              </p>
            </div>
            <div className="ms-auto">
              <TertiaryCustomButton
                onClick={() => navigate(`/editpost/${postId}`)}
                className="text-primary"
              >
                ویرایش پست
                <Pencil />
              </TertiaryCustomButton>
            </div>
          </div>
          <Card className="w-full max-w-md rounded-[12.5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden">
            {/* Image */}
            <div className="w-full">
              {/* {post.imageUrl && <img
              src={post.imageUrl[0]}
              alt={post.text}
              className="w-full h-auto object-cover"
            />} */}
              <Carousel className="w-full h-full relative">
                <CarouselContent className="h-full">
                  {postmock.imageUrl.map((img, index) => (
                    <CarouselItem
                      key={index}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      <img
                        src={postmock.imageUrl[index]}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Absolute buttons on the edges of the label */}
                {postmock.imageUrl.length > 1 && (
                  <CarouselPrevious
                    type="button"
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-20"
                  />
                )}
                {postmock.imageUrl.length > 1 && (
                  <CarouselNext
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-20"
                  />
                )}
              </Carousel>
            </div>

            <CardContent className="pt-4 pb-4 relative">
              {postData?.challenge_id && (
                <div
                  className="gap-[4px] flex items-center mb-[16px]"
                  dir="rtl"
                  onClick={() =>
                    console.log("Go to challenge:", postmock.challenge?.id)
                  }
                >
                  <ClipboardCheck className="w-5 h-5 text-secondary" />
                  <p
                    className="font-medium hover:underline cursor-pointer text-right w-full truncate"
                    dir="rtl"
                  >
                    {challenge?.title}
                  </p>
                </div>
              )}

              {/* Like + Comment */}
              <div className="flex items-center gap-[16px] mb-[25px]" dir="rtl">
                <div className="gap-[4px] flex items-center" dir="rtl">
                  <TertiaryCustomButton
                    isGray={isLiked}
                    onClick={handleLikeToggle}
                  >
                    <span
                      dir="rtl"
                      className={`${isLiked ? "text-neutral-gray" : "text-primary"} transition-all duration-200`}
                    >
                      {isLiked ? "پسندیدم" : "پسندیدن"}
                    </span>
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "text-red-500" : "text-primary"} transition-all duration-200`}
                      fill={isLiked ? "red" : "white"}
                    />
                  </TertiaryCustomButton>
                  <p>
                    {convertToPersianDigits(formatFollowBarNumber(likeCount))}
                  </p>
                </div>
                <div className="gap-[4px] flex items-center" dir="rtl">
                  <TertiaryCustomButton>
                    <span dir="rtl" className="text-primary">
                      نظر
                    </span>
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </TertiaryCustomButton>
                  <p>
                    {convertToPersianDigits(
                      formatFollowBarNumber(postData?.comment_count || 0)
                    )}
                  </p>
                </div>
              </div>
              {/* the gray line */}
              <div className="w-full h-[0.5px] bg-neutral-gray absolute right-0 left-0 translate-y-[-10px]"></div>
              {/* Caption */}
              <div className="flex justify-end mt-3 mb-[5px]">
                <div className="flex items-center gap-2" dir="rtl">
                  {/* Avatars, overlapped */}
                  <div className="flex -space-x-2">
                    {activeProfiles.slice(0, 3).map((profile, index) => (
                      <Avatar
                        key={profile.id}
                        className="relative h-8 w-8 border border-secondry rounded-full overflow-hidden shadow-sm"
                        style={{ zIndex: activeProfiles.length - index }}
                      >
                        <AvatarImage src={profile.image} />
                        <AvatarFallback>{profile.fallback}</AvatarFallback>
                      </Avatar>
                    ))}

                    {activeProfiles.length > 3 && (
                      <Avatar className="relative h-8 w-8 border border-secondry bg-muted text-black text-xs flex items-center justify-center shadow-sm rounded-full">
                        +{activeProfiles.length - 3}
                      </Avatar>
                    )}
                  </div>

                  {/* Text – now aligned center with the avatars */}
                  <p className="text-sm">
                    {textLabel}{" "}
                    <span className="font-medium">
                      {activeProfiles[0].fallback}
                    </span>{" "}
                    و غیره
                  </p>
                </div>
              </div>

              {postData?.description &&
              postData.description.length > maxChars ? (
                <p
                  dir="rtl"
                  className="whitespace-pre-wrap break-words leading-relaxed"
                >
                  {text}
                  {isExpanded ? "" : "..."}{" "}
                  <button
                    className="text-neutral-gray-bold text-xs font-semibold cursor-pointer hover:underline"
                    onClick={() => setExpanded(!isExpanded)}
                  >
                    {isExpanded ? "کمتر" : "بیشتر"}
                  </button>
                </p>
              ) : (
                <p
                  dir="rtl"
                  className="whitespace-pre-wrap break-words leading-relaxed"
                >
                  {postData?.description}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="w-full flex items-center gap-3 mb-[10px]" dir="rtl">
          <Avatar
            className="w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[115px] md:h-[115px]
                    rounded-full overflow-hidden"
          >
            <AvatarImage
              alt={username}
              src="https://samanskh.github.io/assets/images/bio-photo.jpg"
              className="object-cover w-full h-full"
            />
            <AvatarFallback
              className={`text-2xl font-semibold ${personalColor} flex items-center justify-center w-full h-full rounded-full`}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div dir="rtl" className="flex flex-col gap-2 translate-y-[2px]">
            <p className="text-sm sm:text-base font-semibold text-black">
              {username}
            </p>
            <p
              dir="rtl"
              className="text-xs text-neutral-gray-bold font-semibold"
            >
              {convertToPersianDigits(timeAgo(postData?.created_at || ""))}
            </p>
          </div>
        </div>
        <Card className="w-full max-w-md rounded-[12.5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden">
          {/* Image */}
          <div className="w-full"></div>
          <CardContent className="pt-4 pb-4 relative">
            <div className="min-h-[100px]">
              {postData?.description &&
              postData.description.length > maxChars ? (
                <p
                  dir="rtl"
                  className="whitespace-pre-wrap break-words leading-relaxed"
                >
                  {text}
                  {isExpanded ? "" : "..."}{" "}
                  <button
                    className="text-neutral-gray-bold text-xs font-semibold cursor-pointer hover:underline"
                    onClick={() => setExpanded(!isExpanded)}
                  >
                    {isExpanded ? "کمتر" : "بیشتر"}
                  </button>
                </p>
              ) : (
                <p
                  dir="rtl"
                  className="whitespace-pre-wrap break-words leading-relaxed"
                >
                  {postData?.description}
                </p>
              )}
            </div>
            {postData?.challenge_id && (
              <div
                className="gap-[4px] flex items-center mt-[16px] mb-[16px]"
                dir="rtl"
                onClick={() =>
                  console.log("Go to challenge:", postData?.challenge_id)
                }
              >
                <ClipboardCheck className="w-5 h-5 text-secondary" />
                <p
                  className="font-medium hover:underline cursor-pointer text-right w-full truncate"
                  dir="rtl"
                >
                  {challenge?.title}
                </p>
              </div>
            )}

            {/* Like + Comment */}
            <div className="flex items-center gap-[16px] mb-[20px]" dir="rtl">
              <div className="gap-[4px] flex items-center" dir="rtl">
                <TertiaryCustomButton
                  isGray={isLiked}
                  onClick={handleLikeToggle}
                >
                  <span
                    dir="rtl"
                    className={`${isLiked ? "text-neutral-gray" : "text-primary"} transition-all duration-200`}
                  >
                    {isLiked ? "پسندیدم" : "پسندیدن"}
                  </span>
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "text-heart" : "text-primary"} transition-all duration-200`}
                    fill={isLiked ? "red" : "white"}
                  />
                </TertiaryCustomButton>
                <p>
                  {convertToPersianDigits(formatFollowBarNumber(likeCount))}
                </p>
              </div>
              <div className="gap-[4px] flex items-center" dir="rtl">
                <TertiaryCustomButton>
                  <span dir="rtl" className="text-primary">
                    نظر
                  </span>
                  <MessageCircle className="w-5 h-5 text-primary" />
                </TertiaryCustomButton>
                <p>
                  {convertToPersianDigits(
                    formatFollowBarNumber(postData?.comment_count || 0)
                  )}
                </p>
              </div>
            </div>
            {/* Caption */}
            <div className="flex justify-end mt-3 mb-[5px]">
              <div className="flex items-center gap-2" dir="rtl">
                {/* Avatars, overlapped */}
                <div className="flex -space-x-2">
                  {activeProfiles.slice(0, 3).map((profile, index) => (
                    <Avatar
                      key={profile.id}
                      className="relative h-8 w-8 border border-secondry rounded-full overflow-hidden shadow-sm"
                      style={{ zIndex: activeProfiles.length - index }}
                    >
                      <AvatarImage src={profile.image} />
                      <AvatarFallback>{profile.fallback}</AvatarFallback>
                    </Avatar>
                  ))}

                  {activeProfiles.length > 3 && (
                    <Avatar className="relative h-8 w-8 border border-secondry bg-muted text-black text-xs flex items-center justify-center shadow-sm rounded-full">
                      +{activeProfiles.length - 3}
                    </Avatar>
                  )}
                </div>

                {/* Text – now aligned center with the avatars */}
                <p className="text-sm">
                  {textLabel}{" "}
                  <span className="font-medium">
                    {activeProfiles[0].fallback}
                  </span>{" "}
                  و غیره
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostPage;
