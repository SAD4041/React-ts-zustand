import { getData, deleteData } from "./services";

export const fetchUsers = async (loggedInUserId: string, activeTab: 'followers' | 'followings') => {
  const endpoint = activeTab === 'followers'
    ? `/api/v1/users/${loggedInUserId}/followers`
    : `/api/v1/users/${loggedInUserId}/following`;

  try {
    const data = await getData({ endPoint: endpoint });
    return data.users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

// Method to remove a follower
export const removeFollower = async (loggedInUserId: string, followerId: string, token: string) => {
  const endpoint = `/api/v1/followers/remove`;
  const requestBody = {
    follower_id: followerId,
  };
  
  try {
    const data = await deleteData({
      endPoint: endpoint,
      data: requestBody,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data; // Optionally return response if needed
  } catch (error) {
    console.error('Failed to remove follower:', error);
    throw error;
  }
};

// Method to remove a following
export const removeFollowing = async (loggedInUserId: string, followingId: string, token: string) => {
  const endpoint = `/api/v1/follow`;
  const requestBody = {
    following_id: followingId,
  };

  try {
    const data = await deleteData({
      endPoint: endpoint,
      data: requestBody,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data; // Optionally return response if needed
  } catch (error) {
    console.error('Failed to remove following:', error);
    throw error;
  }
};
