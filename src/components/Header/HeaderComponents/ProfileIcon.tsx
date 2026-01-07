import User from '@/assets/icon.png';
import { Link } from "react-router-dom";
import useUserStore from "@/store/userStore/userStore";

const ProfileIcon = () => {
  const role = useUserStore((state) => state.user?.role);
  const profilePath = role === "brand" ? "/dash/brand/profile-edit" : "/dash/profile";

  return (
    <Link
      to={profilePath}
      className="text-foreground hover:text-muted-foreground transition-colors"
    >
      <img src={User} alt="پروفایل" className="h-5 w-5" />
    </Link>
  );
};

export default ProfileIcon;
