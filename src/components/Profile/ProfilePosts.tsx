import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import convertToPersianDigits from "@/utils/convertToPersianDigits";
import formatFollowBarNumber from "@/utils/formatFollowBarNumber";
interface Post {
  id: number;
  imageUrl: string[]; //=======> string []
  text: string;
  challenge?: {
    id: number;
    challengeTitle: string;
  };
}
export const posts: Post[] = [
  {
    id: 1,
    imageUrl: ["https://picsum.photos/id/1011/600/800"],
    text: "صبح زود و قدم‌زدن کنار دریا",
  },
  {
    id: 2,
    imageUrl: [
      "https://picsum.photos/id/1025/600/900",
      "https://picsum.photos/id/1026/600/900",
    ],
    text: "جنگل مه‌آلود و آرامش‌بخش",
  },
  {
    id: 3,
    imageUrl: ["https://picsum.photos/id/1003/500/700"],
    text: "ساعت 5 صبح برقان و شروع یک روز عالی",
    challenge: { id: 1, challengeTitle: "چالش تناسب اندام" },
  },
  {
    id: 4,
    imageUrl: [
      "https://picsum.photos/id/1035/600/750",
      "https://picsum.photos/id/1036/600/750",
    ],
    text: "کوهنوردی و ماجراجویی",
  },
  {
    id: 5,
    imageUrl: ["https://picsum.photos/id/1015/600/400"],
    text: "غروب ساحل آرام",
  },
  {
    id: 6,
    imageUrl: [],
    text: "قهوه داغ صبحگاهی و دارم تست میکنم محدودیت متن رو ببینم ایا چقدر کم میکنه از این متن و لاب لاب لاب بیا بیا برو برو براه براه",
    challenge: { id: 2, challengeTitle: "چالش ۳۰ روز صبح زود بیدار شدن" },
  },
  {
    id: 7,
    imageUrl: ["https://picsum.photos/id/1043/700/950"],
    text: "نمای شهر از بالا",
  },
  {
    id: 8,
    imageUrl: [
      "https://picsum.photos/id/180/600/900",
      "https://picsum.photos/id/181/600/900",
    ],
    text: "برنامه‌نویسی شبانه با موسیقی",
  },
  {
    id: 9,
    imageUrl: ["https://picsum.photos/id/1074/600/500"],
    text: "صبح بارانی در خیابان",
  },
  {
    id: 10,
    imageUrl: ["https://picsum.photos/id/1084/600/850"],
    text: "کتاب‌خوانی در یک عصر بارانی",
    challenge: { id: 3, challengeTitle: "چالش کتاب‌خوانی" },
  },
  {
    id: 11,
    imageUrl: ["https://picsum.photos/id/1080/500/600"],
    text: "دوچرخه‌سواری در پارک",
  },
  {
    id: 12,
    imageUrl: [
      "https://picsum.photos/id/1079/700/900",
      "https://picsum.photos/id/1078/700/900",
    ],
    text: "نمایی از کوه‌های پوشیده از برف",
  },
  {
    id: 13,
    imageUrl: ["https://picsum.photos/id/1077/600/500"],
    text: "گل‌های بهاری و هوای تازه",
  },
  {
    id: 14,
    imageUrl: ["https://picsum.photos/id/1070/600/650"],
    text: "صبح آرام در کنار پنجره",
    challenge: { id: 4, challengeTitle: "چالش آرامش ذهن" },
  },
  {
    id: 15,
    imageUrl: ["https://picsum.photos/id/1068/600/400"],
    text: "قدم‌زدن در جنگل",
  },
  {
    id: 16,
    imageUrl: ["https://picsum.photos/id/1063/700/800"],
    text: "کافه دنج و قهوه تلخ",
  },
  {
    id: 17,
    imageUrl: ["https://picsum.photos/id/1059/500/700"],
    text: "غذای خوشمزه خانگی",
  },
  {
    id: 18,
    imageUrl: [
      "https://picsum.photos/id/1057/600/900",
      "https://picsum.photos/id/1058/600/900",
    ],
    text: "ساحل آرام و موج‌های آرام",
    challenge: { id: 5, challengeTitle: "چالش مراقبت از خود" },
  },
  {
    id: 19,
    imageUrl: ["https://picsum.photos/id/1056/600/450"],
    text: "غروب آفتاب زیبا",
  },
  {
    id: 20,
    imageUrl: ["https://picsum.photos/id/1052/700/500"],
    text: "گربه‌ای که روی مبل خوابیده",
  },
  {
    id: 21,
    imageUrl: ["https://picsum.photos/id/1049/600/750"],
    text: "عکسی از خیابان قدیمی",
  },
  {
    id: 22,
    imageUrl: ["https://picsum.photos/id/1048/600/800"],
    text: "نمایی از آسمان خراش‌ها",
    challenge: { id: 6, challengeTitle: "چالش ۱۰ هزار قدم" },
  },
  {
    id: 23,
    imageUrl: ["https://picsum.photos/id/1045/600/900"],
    text: "قایقی روی آب آرام",
  },
  {
    id: 24,
    imageUrl: ["https://picsum.photos/id/1040/500/550"],
    text: "خانه‌ای در روستا",
  },
  {
    id: 25,
    imageUrl: [
      "https://picsum.photos/id/1039/600/600",
      "https://picsum.photos/id/1037/600/600",
    ],
    text: "کودکی در حال بازی",
    challenge: { id: 7, challengeTitle: "چالش لحظه‌شناسی" },
  },
  {
    id: 26,
    imageUrl: ["https://picsum.photos/id/1038/600/950"],
    text: "تپه‌های سبز و آسمان آبی",
  },
  {
    id: 27,
    imageUrl: ["https://picsum.photos/id/1020/600/800"],
    text: "سفر جاده‌ای طولانی",
  },
  {
    id: 28,
    imageUrl: [
      "https://picsum.photos/id/1019/500/600",
      "https://picsum.photos/id/1021/500/600",
    ],
    text: "بستن کفش‌های ورزشی",
  },
  {
    id: 29,
    imageUrl: ["https://picsum.photos/id/1018/700/850"],
    text: "گلدان گل کنار پنجره",
    challenge: { id: 8, challengeTitle: "چالش مراقبت از گیاه" },
  },
  {
    id: 30,
    imageUrl: [
      "https://picsum.photos/id/1016/600/700",
      "https://picsum.photos/id/1017/600/700",
    ],
    text: "صبح دلپذیر با چای سبز",
  },
];

const postSkeleton = [
  { id: 1, ratio: 1 },
  { id: 2, ratio: 3 / 4 },
  { id: 3, ratio: 9 / 16 },
  { id: 4, ratio: 4 / 5 },
  { id: 5, ratio: 1 },
  { id: 6, ratio: 3 / 4 },
  { id: 7, ratio: 9 / 16 },
  { id: 8, ratio: 3 / 4 },
];
const ProfilePosts = () => {
  const loading = false;
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
                      <span>{convertToPersianDigits(formatFollowBarNumber(120))}</span>
                    </div>
                    <div className="flex gap-[5px] text-white">
                      <MessageCircle size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(120))}</span>
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
                      <span>{convertToPersianDigits(formatFollowBarNumber(120_000_000))}</span>
                    </div>
                    <div className="flex gap-[5px]">
                      <MessageCircle size={"20px"} />
                      <span>{convertToPersianDigits(formatFollowBarNumber(120_000))}</span>
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
