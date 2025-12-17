import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockposts, postSkeleton } from "@/data/mockPosts";
import {
  getChallengePostsService,
  getChallengesWithIdService,
} from "@/services/postService";
import type { ChallengePreview } from "@/types/postTypes";
import type { simplePost } from "@/types/profilePostsTypes";
import convertToPersianDigits from "@/utils/convertToPersianDigits";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
import { mapBackendPostsToUI } from "@/utils/mapBackendPostsToUI";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChallengePosts = () => {
  const { id } = useParams();
  const challengeId = Number(id);
  const [posts, setPosts] = useState<simplePost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [challengeName, setChallengeName] = useState("");

  const fetchChallengeById = async () => {
    try {
      const challenge: ChallengePreview =
        await getChallengesWithIdService(challengeId);
      setChallengeName(challenge.title);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backendPosts = await getChallengePostsService(challengeId);
        const mappedPosts = mapBackendPostsToUI(backendPosts);
        setPosts(mappedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    fetchChallengeById();
  }, [challengeId]);
  if (loading) {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 p-3">
        {postSkeleton.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-3">
            <Card className="overflow-hidden rounded-[12.5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:shadow-2xl hover:opacity-90 transition cursor-pointer">
              <AspectRatio ratio={post.ratio}>
                <Skeleton className="h-full w-full rounded-[12.5px] rounded-b-none" />
              </AspectRatio>
              <CardFooter className="p-4 py-2 justify-end">
                <Skeleton className="h-4 w-4/5" />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="px-[var(--side-page)] my-[var(--top-page)]">
        <div className="flex items-center justify-between">
          <button
            className="p-2 border-2 border-primary rounded-xl hover:bg-primary-hover transition-colors"
            onClick={() => navigate(`/challenge/${challengeId}`)}
          >
            <ArrowLeft className="w-8 h-8 text-primary" />
          </button>

          <p className="text-center font-bold text-title text-primary truncate" dir="rtl">
            {challengeName}
          </p>
        </div>

      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 pt-[var(--top-page)]">
        {posts.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-3">
            <Card
              className="overflow-hidden rounded-xl shadow-shadow-strong border-2 border-black hover:shadow-2xl hover:opacity-90 transition cursor-pointer"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {/* <AspectRatio ratio={post.ratio}> */}
              {post.imageUrl && post.imageUrl.length > 0 && (
                <div className="relative">
                  <img
                    src={mockposts[post.id - 1].imageUrl[0]} //post.imageUrl[0]
                    alt={`Post ${post.id}`}
                    className="object-cover w-full rounded-t-[10px]" //this should be 12.5 but with 12.5 does not fit on the border
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-2 flex gap-4 items-center"
                    dir="rtl"
                  >
                    <div className="flex gap-[5px] text-white">
                      <Heart size={"20px"} />
                      <span>
                        {convertToPersianDigits(
                          formatFollowBarNumber(post.like_count)
                        )}
                      </span>
                    </div>
                    <div className="flex gap-[5px] text-white">
                      <MessageCircle size={"20px"} />
                      <span>
                        {convertToPersianDigits(
                          formatFollowBarNumber(post.comment_count)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <CardFooter className="p-4 py-2 justify-end">
                <div className="flex flex-col gap-2 w-full">
                  <p
                    className={
                      post.imageUrl && post.imageUrl.length > 0
                        ? "truncate"
                        : "leading-relaxed line-clamp-5"
                    }
                    dir="rtl"
                  >
                    {post.text}
                  </p>
                  {post.imageUrl && post.imageUrl.length === 0 && (
                    <div className="flex gap-4" dir="rtl">
                      <div className="flex gap-[5px]">
                        <Heart size={"20px"} />
                        <span>
                          {convertToPersianDigits(
                            formatFollowBarNumber(post.like_count)
                          )}
                        </span>
                      </div>
                      <div className="flex gap-[5px]">
                        <MessageCircle size={"20px"} />
                        <span>
                          {convertToPersianDigits(
                            formatFollowBarNumber(post.comment_count)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengePosts;
