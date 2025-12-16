import User from '@/assets/icon.png';

const ProfileIcon = () => (
  <button className="text-foreground hover:text-muted-foreground transition-colors">
    <img src={User} alt="پروفایل" className="h-5 w-5" />
  </button>
);

export default ProfileIcon;