import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ToggleButtons from "@/components/FollowerFollowing/ToggleButtons";
import BackButtonWithUsername from "@/components/FollowerFollowing/BackButtonWithUsername";
import SearchBar from "@/components/FollowerFollowing/SearchBar";
import UserCardList from "@/components/FollowerFollowing/UserCardList";
import DeleteConfirmationModal from "@/components/FollowerFollowing/DeleteConfirmationModal";
import { fetchUsers } from "@/services/followerFollowingService";
import useUserStore from "@/store/userStore/userStore";
import { removeFollower, removeFollowing } from "@/services/followerFollowingService"; // Import the service methods

interface User {
  id: string;
  username: string;
  imagePath: string;
}

const FollowerFollowingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the token from the Zustand store
  const { token } = useUserStore(state => state);

  const [state, setState] = useState({
    activeTab: 'followers' as 'followers' | 'followings',
    showDeleteModal: false,
    userToDelete: null as { id: string; username: string } | null,
    followers: [] as User[],
    followings: [] as User[],
    filteredUsers: [] as User[], // Added state for filtered users
    loading: false,
    error: null as string | null,
  });

  const { activeTab, showDeleteModal, userToDelete, followers, followings, filteredUsers, loading, error } = state;
  const fullName = location.state?.fullName || "Unknown User";
  const loggedInUserId = '8'; // Ideally, this comes from authentication context
  const isOwner = loggedInUserId === '8';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") as 'followers' | 'followings' | null;
    if (tab) setState(prevState => ({ ...prevState, activeTab: tab }));
  }, [location.search]);

  const fetchUserData = async () => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const users = await fetchUsers(loggedInUserId, activeTab);
      setState(prevState => ({
        ...prevState,
        [activeTab]: users,
        filteredUsers: users, // Set the filteredUsers to all users initially
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: "Failed to load users. Please try again later.",
      }));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [loggedInUserId, activeTab]);

  const handleTabSwitch = (tab: 'followers' | 'followings') => {
    setState(prevState => ({ ...prevState, activeTab: tab }));
    navigate(`/follow?tab=${tab}`, { state: { fullName } });
  };

  const handleDeleteClick = (id: string, username: string) => {
    setState(prevState => ({ ...prevState, userToDelete: { id, username }, showDeleteModal: true }));
  };

  const handleDeleteConfirmation = async () => {
    if (userToDelete && token) { 
      try {
        let response;

        const requestBody = {
          [activeTab === 'followers' ? 'follower_id' : 'following_id']: userToDelete.id,
        };

        console.log("Request body:", requestBody);
        console.log("Authorization token:", token);

        if (activeTab === 'followers') {
          response = await removeFollower(loggedInUserId, userToDelete.id, token);
        } else if (activeTab === 'followings') {
          response = await removeFollowing(loggedInUserId, userToDelete.id, token);
        }

        if (response) {
          setState(prevState => ({
            ...prevState,
            [activeTab]: prevState[activeTab].filter(user => user.id !== userToDelete.id),
            filteredUsers: prevState[activeTab].filter(user => user.id !== userToDelete.id), // Update filtered list as well
            showDeleteModal: false,
            userToDelete: null,
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            error: `Failed to remove ${activeTab.slice(0, -1)}. Please try again.`,
          }));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setState(prevState => ({
          ...prevState,
          error: 'Error deleting user. Please try again later.',
        }));
      }
    } else {
      setState(prevState => ({
        ...prevState,
        error: 'Authentication required to perform this action.',
      }));
    }
  };

  const handleDeleteCancel = () => {
    setState(prevState => ({ ...prevState, showDeleteModal: false, userToDelete: null }));
  };

  // Search function: filters the list based on the search term
  const handleSearch = (searchTerm: string) => {
    const filteredList = (activeTab === 'followers' ? followers : followings).filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setState(prevState => ({ ...prevState, filteredUsers: filteredList }));
  };

  // Prevent form submission on Enter key press
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent form submission when Enter is pressed
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      <BackButtonWithUsername 
        username={fullName} 
        onBackClick={() => navigate(`/dashboard/${loggedInUserId}`)} 
      />
      <ToggleButtons activeTab={activeTab} onTabSwitch={handleTabSwitch} />

      <Formik
        initialValues={{ searchTerm: '' }}
        validationSchema={Yup.object({
          searchTerm: Yup.string(),
        })}
        onSubmit={() => {}} // We don't use onSubmit here anymore
      >
        {({ values, handleChange, handleBlur }) => {
          return (
            <Form
              className="w-full max-w-md mb-6 flex flex-col items-center justify-center"
              onKeyDown={handleKeyDown} // Add this handler to prevent Enter key submission
            >
              {/* Dynamically filter users as you type */}
              <SearchBar 
                searchTerm={values.searchTerm} 
                onSearchTermChange={(e) => {
                  handleChange(e);  // Handle form input change
                  handleSearch(e.target.value); // Update filtered users dynamically
                }} 
                onBlur={handleBlur} 
              />
              {loading ? (
                <p className="font-semibold text-primary text-2xl">در حال بارگذاری...</p>
              ) : error ? (
                <p className="font-semibold text-red-500 text-2xl">{error}</p>
              ) : (
                <UserCardList 
                  users={filteredUsers || []} // Display the filtered list of users
                  onDelete={handleDeleteClick} 
                  isOwner={isOwner} 
                />
              )}
            </Form>
          );
        }}
      </Formik>

      {showDeleteModal && userToDelete && (
        <DeleteConfirmationModal
          username={userToDelete.username}
          listType={activeTab}
          onDeleteConfirm={handleDeleteConfirmation}
          onDeleteCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default FollowerFollowingPage;
