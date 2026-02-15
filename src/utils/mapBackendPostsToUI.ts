import type { PostResponse } from "@/types/postTypes"; // your API type
import type { simplePost } from "@/types/profilePostsTypes"; // your UI type

export const mapBackendPostsToUI = (backendPosts: PostResponse[]): simplePost[] => {
  return backendPosts.map((p) => ({
    id: p.id,
    imageUrl: p.pictures || [], // assuming backend sends array of URLs as 'pictures'
    text: p.description || "", // map description to text
    like_count: p.like_count,
    comment_count: p.comment_count,
  }));
};
