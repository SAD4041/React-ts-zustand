import React, { useState } from 'react';
import { FiHome, FiHeart, FiUser, FiBell, FiShoppingBag, FiLogOut } from 'react-icons/fi';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function UserSidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'خانه', icon: <FiHome className="w-10 h-10" /> },
    { id: 'products', label: 'سفارش‌ها', icon: <FiShoppingBag className="w-10 h-10" /> },
    { id: 'analytics', label: 'اعلان‌ها', icon: <FiBell className="w-10 h-10" /> },
    { id: 'settings', label: 'علاقه‌مندی‌ها', icon: <FiHeart className="w-10 h-10" /> },
    { id: 'profile', label: 'پروفایل', icon: <FiUser className="w-10 h-10" /> },
    { id: 'logout', label: 'خروج', icon: <FiLogOut className="w-10 h-10" /> },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-gray-100 shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-[300px]' : 'w-[110px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'vazirmatn, sans-serif' }}
    >
      <nav className="flex flex-col h-full py-4 justify-between">
        {/* top items */}
        <div>
          {navItems.slice(0, navItems.length - 1).map(item => (
            <div key={item.id} className="relative flex items-center justify-end px-9 py-6 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
              <span className={`text-gray-800 text-2xl mr-14 whitespace-nowrap transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
              }`}>
                {item.label}
              </span>

              <div className="flex-shrink-0 text-gray-800">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* bottom item (logout) */}
        <div>
          {(() => {
            const item = navItems[navItems.length - 1];
            return (
              <div key={item.id} className="relative flex items-center justify-end px-9 py-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                <span className={`text-gray-800 text-2xl mr-14 whitespace-nowrap transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                }`}>
                  {item.label}
                </span>

                <div className="flex-shrink-0 text-gray-800">
                  {item.icon}
                </div>
              </div>
            );
          })()}
        </div>
      </nav>
    </div>
  );
}