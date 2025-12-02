export interface CreatePostPayload {
	description: string;
	challenge_id?: number|null;
	pictures?: string[];
}

export interface UpdatePostPayload {
    id: number;
	description: string;
	pictures?: string[];
}

export interface PostResponse {
  id: number;
  user_id: number;
  username: string;
  description: string;
  challenge_id: number | null;  
  pictures: string[];
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  created_at: string;  
  updated_at: string; 
}

//for the challenge preview in post
export interface UserPreview {
  id: number;
  username: string;
}

export interface ChallengePreview {
  id: number;
  title: string;
  description: string;
  rule: string; 
  categoryName: string;
  creatorUsername: string;
  creatorID: number;
  visibility: string; 
  imageURL: string;
  maxParticipants: number;
  currentParticipants: number;
  likeCount: number;
  commentCount: number;
  startTime: string; 
  endTime?: string | null; 
  timezone: string;
  createdAt: string; 
  isUserParticipating: boolean;
  isUserLiked: boolean;
  mutualParticipants: UserPreview[];
}

export interface LikeRequest {
  entity_type: string;
  entity_id: number;
}