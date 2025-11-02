import User from '@/assets/icon.png';

const ProfileIcon = () => (
  <button 
    className="text-gray-600 hover:text-gray-800 transition-colors" 
    aria-label="پروفایل"
  >
    <img src={User} alt="پروفایل" className="h-5 w-5" />
  </button>
);

export default ProfileIcon;