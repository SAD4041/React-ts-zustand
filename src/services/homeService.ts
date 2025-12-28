import { getData, postData } from "./services";
import type { HomePageResponse } from "@/types/homeTypes";

export const fetchHomePageData = async (): Promise<HomePageResponse> => {
  try {
    const data = await getData({
      endPoint: "/api/homepage", 
    });
    return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error;
  }
};

export interface UserAction {
  action: "click" | "search" | "view";
  target_type: "product" | "brand" | "category";
  target_id: number;
  query?: string;
  timestamp: string;
}

export const sendUserAction = async (action: UserAction): Promise<void> => {
  try {
    await postData({
      endPoint: "/api/user-actions",
      data: action,
    });
  } catch (error) {
    console.error("Error sending user action:", error);
  }
};