import User from '@/assets/icon.png';
import { Link } from "react-router-dom";

const ProfileIcon = () => (
  <Link
    to="/dash/profile"
    className="text-foreground hover:text-muted-foreground transition-colors"
  >
    <img src={User} alt="پروفایل" className="h-5 w-5" />
  </Link>
);

export default ProfileIcon;
