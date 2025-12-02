export interface MockPost {
  id: number;
  imageUrl: string[]; //=======> string []
  text: string;
  challenge?: {
    id: number;
    challengeTitle: string;
  };
}
export interface simplePost {
  id: number;
  imageUrl?: string[];
  text: string;
  like_count: number;
  comment_count: number;
}