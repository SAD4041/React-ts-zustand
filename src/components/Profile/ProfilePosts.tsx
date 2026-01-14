import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";


const posts = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/300/300?random=1",
    text: "ورزشی روزانه",
    ratio: 1,
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/300/400?random=2",
    text: "طبیعت زیبا و الهام‌بخش",
    ratio: 3 / 4,
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/225?random=3",
    text: "چالش سلامتی",
    ratio: 9 / 16,
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/400/500?random=4",
    text: "هنر دیجیتال مدرن",
    ratio: 4 / 5,
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/300/300?random=5",
    text: "مسابقه عکاسی",
    ratio: 1,
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/300/400?random=6",
    text: "دستاورد جدید تیم تحقیقاتی دانشگاه علم و صنعت",
    ratio: 3 / 4,
  },
  {
    id: 7,
    imageUrl: "https://picsum.photos/400/225?random=7",
    text: "نمایی از شب تهران",
    ratio: 9 / 16,
  },
  {
    id: 8,
    imageUrl: "https://picsum.photos/300/400?random=8",
    text: "یادگیری برنامه‌نویسی با پروژه‌های واقعی",
    ratio: 3 / 4,
  },
  {
    id: 9,
    imageUrl: "https://picsum.photos/300/300?random=9",
    text: "سفر به شمال ایران",
    ratio: 1,
  },
  {
    id: 10,
    imageUrl: "https://picsum.photos/400/225?random=10",
    text: "غروب ساحلی آرام",
    ratio: 9 / 16,
  },
  {
    id: 11,
    imageUrl: "https://picsum.photos/300/400?random=11",
    text: "ورزش صبحگاهی برای انرژی روزانه",
    ratio: 3 / 4,
  },
  {
    id: 12,
    imageUrl: "https://picsum.photos/400/225?random=12",
    text: "طراحی رابط کاربری مدرن",
    ratio: 9 / 16,
  },
  {
    id: 13,
    imageUrl: "https://picsum.photos/300/300?random=13",
    text: "چالش خواندن کتاب",
    ratio: 1,
  },
  {
    id: 14,
    imageUrl: "https://picsum.photos/300/400?random=14",
    text: "بهترین غذاهای محلی شمال کشور",
    ratio: 3 / 4,
  },
  {
    id: 15,
    imageUrl: "https://picsum.photos/400/225?random=15",
    text: "رویداد فناوری دانشگاه",
    ratio: 9 / 16,
  },
  {
    id: 16,
    imageUrl: "https://picsum.photos/300/400?random=16",
    text: "تمرین تمرکز ذهن و یوگا",
    ratio: 3 / 4,
  },
  {
    id: 17,
    imageUrl: "https://picsum.photos/400/225?random=17",
    text: "پست آزمایشی دیگر برای تست چند خطی بودن توضیح",
    ratio: 9 / 16, //these too long
  },
  {
    id: 18,
    imageUrl: "https://picsum.photos/300/300?random=18",
    text: "کد نویسی و قهوه ☕",
    ratio: 1,
  }
];
const postSkeleton = [{ id: 1, ratio: 1 }, { id: 2, ratio: 3 / 4 }, { id: 3, ratio: 9 / 16 }, { id: 4, ratio: 4 / 5 } , { id: 5, ratio: 1 }, { id: 6, ratio: 3 / 4 }, { id: 7, ratio: 9 / 16 }, { id: 8, ratio: 3 / 4 }];
const ProfilePosts = () => {

  const loading = false;
  
  if (loading) {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 p-3">
        {postSkeleton.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-3">
            <Card className="overflow-hidden shadow-md hover:shadow-2xl hover:opacity-90 transition cursor-pointer">
              <AspectRatio ratio={post.ratio}>
                <Skeleton className="h-full w-full rounded-xl rounded-b-none" />
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
          <Card className="overflow-hidden shadow-md hover:shadow-2xl hover:opacity-90 transition cursor-pointer">
           <AspectRatio ratio={post.ratio}>
              <img
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <CardFooter className="p-4 py-2 justify-end">
              <p className="truncate" dir="rtl">
                {post.text}
              </p>
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
