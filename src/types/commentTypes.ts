export interface CommentRequest {
  entity_type: "challenge" | "post"; 
  entity_id: number;
  content: string;
  parent_id?: number | null; 
}

export interface CommentResponse {
  id: number;
  entity_type: "challenge" | "post";
  entity_id: number;
  user_id: number;
  username: string;
  content: string;
  parent_id?: number | null;
  like_count: number;
  is_liked: boolean;
  created_at: string;
  replies?: CommentResponse[]; 
}

export interface GetCommentsRequest {
  entity_type: "post" | "challenge";
  entity_id: number;
}
