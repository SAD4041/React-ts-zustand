import React, { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import convertToPersianDigits from "@/utils/convertToPersianDigits";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
import { getUserPostsService } from "@/services/postService";
import { mapBackendPostsToUI } from "@/utils/mapBackendPostsToUI";
import useUserStore from "@/store/userStore/userStore";
import type { MockPost, simplePost } from "@/types/profilePostsTypes";
import { postSkeleton } from "@/data/mockPosts";




const ProfilePosts = () => {
  const {userId} = useUserStore();
  const [posts, setPosts] = useState<simplePost[]>([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backendPosts = await getUserPostsService(userId);
        const mappedPosts = mapBackendPostsToUI(backendPosts);
        setPosts(mappedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);
  
  const navigate = useNavigate();
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
    // <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-1 mt-2.5">
    //   {posts.map((post) => (
    //     <Card
    //       key={post.id}
    //       className="cursor-pointer overflow-hidden cursor-pointer hover:opacity-90 transition"
    //       onClick={() => console.log(post.id + " clicked!")}
    //     >
    //       <AspectRatio ratio={4 / 5}>
    //         <img
    //           src={post.imageUrl}
    //           alt={`Post ${post.id}`}
    //           className="object-cover w-full h-full"
    //         />
    //       </AspectRatio>

    <div className="columns-2 sm:columns-3 md:columns-4 gap-3 p-3">
      {posts.map((post) => (
        <div key={post.id} className="break-inside-avoid mb-3">
          <Card
            className="overflow-hidden rounded-[12.5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:shadow-2xl hover:opacity-90 transition cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {/* <AspectRatio ratio={post.ratio}> */}
            {post.imageUrl && post.imageUrl.length > 0 && (
              <div className="relative">
              <img
                src={post.imageUrl[0]}
                alt={`Post ${post.id}`}
                className="object-cover w-full rounded-t-[10px]" //this should be 12.5 but with 12.5 does not fit on the border
              />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-2 flex gap-4 items-center" dir="rtl">
                    <div className="flex gap-[5px] text-white">
                      <Heart size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(post.like_count))}</span>
                    </div>
                    <div className="flex gap-[5px] text-white">
                      <MessageCircle size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(post.comment_count))}</span>
                    </div>
                  </div>
              </div>
            )}
            <CardFooter className="p-4 py-2 justify-end">
              <div className="flex flex-col gap-2 w-full">
                {/* {post.imageUrl && post.imageUrl.length > 0 && (
                  <div className="flex gap-4" dir="rtl">
                    <div className="flex items-center gap-[5px]">
                      <Heart size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(120))}</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <MessageCircle size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(120))}</span>
                    </div>
                  </div>
                )} */}
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
                      <span>{convertToPersianDigits(formatFollowBarNumber(post.like_count))}</span>
                    </div>
                    <div className="flex gap-[5px]">
                      <MessageCircle size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(post.comment_count))}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>

    //       <CardFooter className="p-4 py-2 justify-end">
    //         <p className="truncate" dir="rtl">
    //           {post.footer}
    //         </p>
    //       </CardFooter>
    //     </Card>
    //   ))}
    // </div>
  );
};

export default ProfilePosts;
