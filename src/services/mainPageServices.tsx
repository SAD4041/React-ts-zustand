import { getData } from "@/services/services";


export const searchChallengesService = async (query = '', filters = {}) => {
  try {
    const params = {
      query: query.trim(),
      ...filters
    };
    
    const response = await getData({
      endPoint: "/api/v1/challenges/search",
      params
    });
    
    return response || [];
  } catch (error) {
    console.error('Error in searchChallengesService:', error);
    throw error;
  }
};