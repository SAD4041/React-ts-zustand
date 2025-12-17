import type { CreatePostPayload, LikeRequest, UpdatePostPayload } from "@/types/postTypes";
import { deleteData, getData, postData, PROTECTED_BASE, putData } from "./services";

export const createPostService = async ({
  description,
  challenge_id,
  pictures,
}: CreatePostPayload) => {
    console.log("createPostService called with:", { description, challenge_id, pictures });
  const data = await postData({
    endPoint: `${PROTECTED_BASE}/posts`,
    data: { description, challenge_id, pictures },
  });
  return data;
};

export const updatePostService = async ({
  id,
  description,
  pictures,
}: UpdatePostPayload) => {
  const data = await putData({
    endPoint: `${PROTECTED_BASE}/posts/${id}`,
    data: { description, pictures },
  });
  return data;
};

export const getPostService = async (id: number) => {
  return await getData({
    endPoint: `${PROTECTED_BASE}/posts/${id}`,
  });
};

export const deletePostService = async (id: number) => {
  return await deleteData({
    endPoint: `${PROTECTED_BASE}/posts/${id}`,
  });
};

export const getParticipatingChallengesService = async () => {
  const res = await getData({
    endPoint: `${PROTECTED_BASE}/challenges/participating`,
  });
  return res.data;
};

export const getChallengesWithIdService = async (id: number) => {
  const res = await getData({
    endPoint: `${PROTECTED_BASE}/challenges/${id}`,
  });
  return res.data;
};

export const LikeService = async ({
  entity_type,
  entity_id
}: LikeRequest) => {
  const data = await postData({
    endPoint: `${PROTECTED_BASE}/likes`,
    data: { entity_type, entity_id },
  });
  return data;
};

export const UnlikeService = async ({
  entity_type,
  entity_id
}: LikeRequest) => {
  return await deleteData({
    endPoint: `${PROTECTED_BASE}/likes`,
    data: { entity_type, entity_id },
  });
};

export const getUserPostsService = async (id: number) => {
  return await getData({
    endPoint: `${PROTECTED_BASE}/posts/user/${id}`,
  });
};

export const getChallengePostsService = async (id: number) => {
  return await getData({
    endPoint: `${PROTECTED_BASE}/posts/challenge/${id}`,
  });
};

