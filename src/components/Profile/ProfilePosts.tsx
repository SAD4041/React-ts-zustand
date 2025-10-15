import React from "react";

import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const posts = [
  { id: 1, imageUrl: "https://picsum.photos/300/300?random=1" },
  { id: 2, imageUrl: "https://picsum.photos/300/300?random=2" },
  { id: 3, imageUrl: "https://picsum.photos/300/300?random=3" },
  { id: 4, imageUrl: "https://picsum.photos/300/300?random=4" },
  { id: 5, imageUrl: "https://picsum.photos/300/300?random=5" },
  { id: 6, imageUrl: "https://picsum.photos/300/300?random=6" },
  { id: 7, imageUrl: "https://picsum.photos/300/300?random=7" },
  { id: 8, imageUrl: "https://picsum.photos/300/300?random=8" },
  { id: 9, imageUrl: "https://picsum.photos/300/300?random=9" },
  { id: 10, imageUrl: "https://picsum.photos/300/300?random=10" },
  { id: 11, imageUrl: "https://picsum.photos/300/300?random=11" },
  { id: 12, imageUrl: "https://picsum.photos/300/300?random=12" },
  { id: 13, imageUrl: "https://picsum.photos/300/300?random=13" },
  { id: 14, imageUrl: "https://picsum.photos/300/300?random=14" },
  { id: 15, imageUrl: "https://picsum.photos/300/300?random=15" },
  { id: 16, imageUrl: "https://picsum.photos/300/300?random=16" },
  { id: 17, imageUrl: "https://picsum.photos/300/300?random=17" },
  { id: 18, imageUrl: "https://picsum.photos/300/300?random=18" },
];

const ProfilePosts = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden cursor-pointer hover:opacity-90 transition rounded-none"
          onClick={() => console.log(post.id + " clicked!")}
        >
          <AspectRatio ratio={4 / 5}>
            <img
              src={post.imageUrl}
              alt={`Post ${post.id}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          {/* <CardFooter className="p-4 py-2">
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
};

export default ProfilePosts;
