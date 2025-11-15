import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { searchSchema } from "@/schemas/searchSchema"; // Import the search schema
import ToggleButtons from "@/components/FollowerFollowing/ToggleButtons";
import BackButtonWithUsername from "@/components/FollowerFollowing/BackButtonWithUsername";
import SearchBar from "@/components/FollowerFollowing/SearchBar";
import UserCardList from "@/components/FollowerFollowing/UserCardList";
import DeleteConfirmationModal from "@/components/FollowerFollowing/DeleteConfirmationModal";
import {
  fetchUsers,
  removeFollower,
  removeFollowing,
} from "@/services/followerFollowingService";
import useUserStore from "@/store/userStore/userStore";
import type { FollowerFollowingUser } from "@/types/followerFollowing";

const FollowerFollowingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, id: loggedInUserId } = useUserStore((state) => state);
  const { userId } = useParams();
  const selectedUser = userId || "0";

  const [followers, setFollowers] = useState<FollowerFollowingUser[]>([]);
  const [followings, setFollowings] = useState<FollowerFollowingUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<FollowerFollowingUser[]>([]);

  const [activeTab, setActiveTab] = useState<"followers" | "followings">("followers");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fullName = location.state?.fullName || "Unknown User";
  const isOwner = loggedInUserId === selectedUser;

  // Effect to update the active tab from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") as "followers" | "followings" | null;
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  // Fetch user data based on selected user and active tab
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await fetchUsers(selectedUser, activeTab);
      if (activeTab === "followers") {
        setFollowers(users || []);
      } else {
        setFollowings(users || []);
      }
      setFilteredUsers(users || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setLoading(false);
      setError("Failed to load users. Please try again later.");
    }
  };

  // Fetch user data on page load or when activeTab or selectedUser changes
  useEffect(() => {
    fetchUserData();
  }, [selectedUser, activeTab]);

  // Switch between followers and followings tab
  const handleTabSwitch = (tab: "followers" | "followings") => {
    setActiveTab(tab);
    navigate(`/follow/${selectedUser}?tab=${tab}`, { state: { fullName } });
  };

  // Handle delete button click
  const handleDeleteClick = (id: string, username: string) => {
    setUserToDelete({ id, username });
    setShowDeleteModal(true);
  };

  // Handle confirmation of user deletion
  const handleDeleteConfirmation = async () => {
    if (userToDelete && token) {
      try {
        let response;
        console.log("Authorization token:", token);

        if (activeTab === "followers") {
          response = await removeFollower(
            loggedInUserId,
            userToDelete.id,
            token
          );
        } else if (activeTab === "followings") {
          response = await removeFollowing(
            loggedInUserId,
            userToDelete.id,
            token
          );
        }

        if (response) {
          if (activeTab === "followers") {
            setFollowers((prev) => prev.filter((user) => user.id !== userToDelete.id));
          } else {
            setFollowings((prev) => prev.filter((user) => user.id !== userToDelete.id));
          }
          setFilteredUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
          setShowDeleteModal(false);
          setUserToDelete(null);
        } else {
          setError(`Failed to remove ${activeTab.slice(0, -1)}. Please try again.`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Error deleting user. Please try again later.");
      }
    } else {
      setError("Authentication required to perform this action.");
    }
  };

  // Handle canceling the delete action
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Search for users
  const handleSearch = (searchTerm: string) => {
    const list = activeTab === "followers" ? followers : followings;
    if (list) {
      const filteredList = list.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredList);
    }
  };

  // Prevent form submit on Enter keypress
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      <BackButtonWithUsername
        username={fullName}
        onBackClick={() => navigate(`/dashboard/${selectedUser}`)}
      />
      <ToggleButtons activeTab={activeTab} onTabSwitch={handleTabSwitch} />

      <Formik
        initialValues={{ searchTerm: "" }}
        validationSchema={searchSchema} // Use the schema here
        onSubmit={() => {}}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form
            className="w-full max-w-md mb-6 flex flex-col items-center justify-center"
            onKeyDown={handleKeyDown}
          >
            <SearchBar
              searchTerm={values.searchTerm}
              onSearchTermChange={(e) => {
                handleChange(e);
                handleSearch(e.target.value);
              }}
              onBlur={handleBlur}
            />
            {loading ? (
              <p className="font-semibold text-primary text-2xl">
                در حال بارگذاری...
              </p>
            ) : error ? (
              <p className="font-semibold text-error text-2xl">{error}</p>
            ) : (
              <UserCardList
                users={filteredUsers}
                onDelete={handleDeleteClick}
                isOwner={isOwner}
              />
            )}
          </Form>
        )}
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
