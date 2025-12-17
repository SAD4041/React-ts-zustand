export type Payload = {
  title: string;
  description: string;
  category_id: number;
  max_participants?: number | null;
  visibility: "public" | "private";
  rule?: string;
  comments_enabled: boolean;
  start_time: string;
  end_time: string;
  timezone: string;
  image_url?: string | null;
};
