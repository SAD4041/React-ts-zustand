import { getData } from "./services";
import type { HomePageResponse } from "@/types/homeTypes";
import type { GetParams } from "@/types/apiTypes";

export const fetchHomePageData = async (): Promise<HomePageResponse> => {
  const params: GetParams = {
    endPoint: "/v1/home",
    headers: {},
    params: {},
  };

  return getData(params);
};