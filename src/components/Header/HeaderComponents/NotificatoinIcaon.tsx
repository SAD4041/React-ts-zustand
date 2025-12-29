import Bell from '@/assets/notifications.png';

const NotificationIcon = () => (
  <button className="text-foreground hover:text-muted-foreground transition-colors">
    <img src={Bell} alt="اعلان‌ها" className="h-5 w-5" />
  </button>
);

export default NotificationIcon;