import Bell from '@/assets/notifications.png';

const NotificationIcon = () => (
  <button 
    className="text-gray-600 hover:text-gray-800 transition-colors" 
    aria-label="اعلان‌ها"
  >
    <img src={Bell} alt="اعلان‌ها" className="h-5 w-5" />
  </button>
);

export default NotificationIcon;