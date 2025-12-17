import { useEffect, useState } from "react";
import thumb from "@/assets/Img/Group 101.png";
import TopBackText from "./TopBackText";
import checked from "@/assets/Img/Icon/checked.svg";
import userI from "@/assets/Img/Icon/User.svg";
import { cn } from "@/lib/utils";
import {
  fetchChallengeById,
  inviteMultipleUsersToChallenge,
} from "@/services/challengeService";
import {
  getFollowersService,
  getUserProfileService,
} from "@/services/userService";
import CustomBtn from "./CustomBtn";
import type { User, UserColor, UserIvite } from "@/types/acceptUser";
import styles from "./InviteList.module.css";
import { useParams } from "react-router-dom";

const InviteList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<Number>();
  const [followers, setFollowers] = useState<{
    users: UserIvite[];
    count: number;
  }>({
    users: [],
    count: 0,
  });
  const [selectedUsers, setSelectedUsers] = useState<UserIvite[]>([]);
  const [participants, setParticipants] = useState<Number[]>([]);
  const { challengeId } = useParams<{ challengeId: string }>();

  useEffect(() => {
    const fetch = async () => {
      const challenge = await fetchChallengeById(String(challengeId));
      setParticipants(challenge.participants.map((p) => p.user_id));
    };
    fetch();
  }, []);
  useEffect(() => console.log(participants), [participants]);
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadFollowers();
    }
  }, [user]);

  useEffect(() => {
    if (followers) console.log("followers: ", followers.users);
  }, [followers]);

  const loadUser = async () => {
    if (!isNaN(Number(challengeId))) {
      const user = await getUserProfileService(1); //the argument is not important here
      setUser(Number(user.id));
    }
  };
  const loadFollowers = async () => {
    const followers: { users: UserIvite[]; count: number } =
      await getFollowersService(String(user));
    setFollowers(followers); // must check which one is not already attended
  };

  const Chip = ({
    id,
    username,
    color,
  }: {
    id: number;
    username: string;
    color: UserColor;
  }) => (
    <div
      onClick={() => {
        setSelectedUsers(
          selectedUsers.filter((user) => {
            return user.id != id;
          })
        );
      }}
      className={cn(
        styles.chip,
        color === "gray"
          ? styles.chipGray
          : color === "orange"
            ? styles.chipOrange
            : styles.chipBlue
      )}
    >
      <div className={styles.chipIcon}>
        <img src={userI} alt="" />
      </div>
      <div>{username}</div>
    </div>
  );

  const inviteUsers = async () => {
    const ids = selectedUsers.map((u) => u.id);
    const data = await inviteMultipleUsersToChallenge(challengeId, ids);
  };

  return (
    <div className={styles.container}>
      <TopBackText text="دعوت افراد جدید" />

      <div className="mb-6 p-4 border-2 border-secondary rounded-2xl">
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((user, index) => (
            <Chip
              key={user.id}
              id={user.id}
              username={user.username}
              color={
                index % 3 === 0 ? "gray" : index % 3 === 1 ? "orange" : "blue"
              }
            />
          ))}
        </div>
      </div>

      <CustomBtn
        color="bg-primary"
        onClick={() => inviteUsers()}
        className="mb-[5px]"
      >
        دعوت
      </CustomBtn>

      <div
        className={styles.scrollContainer}
        style={
          {
            "--thumb-image": `url('${thumb}')`,
          } as React.CSSProperties
        }
      >
        <div className={styles.usersList}>
          {followers &&
            followers.users
              .filter((user) => !participants.includes(user.id))
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    if (selectedUsers.find((u) => u.id === user.id))
                      setSelectedUsers(
                        selectedUsers.filter((u) => u.id !== user.id)
                      );
                    else setSelectedUsers([...selectedUsers, user]);
                  }}
                  className={styles.userCard}
                >
                  <div className={styles.userInfo}>
                    <div className={styles.profileImageContainer}>
                      <img
                        className={styles.profileImage}
                        src={""}
                        alt="profile"
                      />
                      <img
                        className={cn(
                          styles.checkedIcon,
                          selectedUsers.find((u) => u.id === user.id)
                            ? "block"
                            : "hidden"
                        )}
                        src={checked}
                        alt=""
                      />
                    </div>
                    <p className={styles.username}>{user.username}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default InviteList;
