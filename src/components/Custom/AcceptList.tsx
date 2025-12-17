import { useEffect, useState } from "react";
import SearchBar from "@/components/ChallengeManagement/public/SearchBar";
import tick from "@/assets/Img/Icon/tick-square.svg";
import cross from "@/assets/Img/Icon/Close Square.svg";
import thumb from "@/assets/Img/Group 101.png";
import TopBackText from "./TopBackText";
import {
  acceptReq,
  deleteReq,
  showRequestingUsers,
} from "@/services/challengeService";
import type { User } from "@/types/acceptUser";
import styles from "./AcceptList.module.css";
import { useNavigate, useParams } from "react-router-dom";

const AcceptList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { challengeId } = useParams<{ challengeId: string }>();
  const searchedUsers = users.filter((user) =>
    user.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      if (!isNaN(Number(challengeId))) {
        const users = await showRequestingUsers(Number(challengeId));
        setUsers(users);
      } else {
        console.log("challenge id must be a number");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (reqId: number) => {
    try {
      const data = await acceptReq(reqId);
      console.log(data);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (reqId: number) => {
    try {
      const data = await deleteReq(reqId);
      console.log(data);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <TopBackText text="درخواست‌ های پیوستن" />
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <div
        className={styles.scrollContainer}
        style={
          {
            "--thumb-image": `url('${thumb}')`,
          } as React.CSSProperties
        }
      >
        <div className={styles.usersList}>
          {searchedUsers.map((user) => (
            <div
              onClick={() => console.log(user)}
              key={user.requestId}
              className={styles.userCard}
            >
              <div className={styles.userInfo}>
                <img className={styles.profileImage} src={""} alt="profile" />
                <p className={styles.username}>{user.user.username}</p>
              </div>
              <div className={styles.actionButtons}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(user.requestId)}
                >
                  <img src={cross} alt="" />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleAccept(user.requestId)}
                >
                  <img src={tick} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcceptList;
