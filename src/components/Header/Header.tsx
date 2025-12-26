import SearchBox from './HeaderComponents/SearchBox';
import { menuItems } from '@/data/data';
import DropdownMenu from './HeaderComponents/DropdownMenu';
import logo from '../../assets/logo.png';
import CartIcon from './HeaderComponents/CartIcon';
import ProfileIcon from './HeaderComponents/ProfileIcon';
import NotificationIcon from './HeaderComponents/NotificatoinIcaon';
import headerBg from '@/assets/Group.png';
import PromoBanner from './HeaderComponents/PromoBanner';
import { useState } from "react";
import CartModal from "@/components/ShoppingCart/CartModal";
import { mockCartItems } from "@/components/ShoppingCart/shoppingCart"


const Header = () => {
  const [openCart, setOpenCart] = useState<boolean>(false);

  const handleRemove = (id: string) => { };
  const handleUpdateQuantity = (id: string, quantity: number) => { };

  const items = mockCartItems;
  return (
    <>
      <header className="bg-white shadow-sm relative z-50">
        <div
          className="py-2.5 px-4 md:px-6 lg:px-8"
          style={{ backgroundImage: `url(${headerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container mx-auto flex items-center">
            <div className="flex items-center space-x-2 space-x-reverse mr-2 md:mr-3">
              <div className="w-11 h-11 md:w-13.5 md:h-13.5 bg-header-bg-blur backdrop-blur-md rounded-full shadow-sm flex items-center justify-center">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-header-bg-blur backdrop-blur-md rounded-full shadow-sm flex items-center justify-center">
                  <img
                    src={logo}
                    alt="لوگو"
                    className="w-11 h-11 md:w-14 md:h-14 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="bg-header-bg-blur backdrop-blur-md rounded-full shadow-sm flex flex-1 items-center justify-between p-1.5 md:p-2.5">
              <div className="ml-4 flex items-center space-x-1 space-x-reverse">
                <CartIcon onClick={() => setOpenCart(true)} />
                <NotificationIcon />
                <ProfileIcon />
              </div>

              <CartModal
                open={openCart}
                onOpenChange={setOpenCart}
                items={items}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />

              <nav className="hidden lg:flex items-center space-x-2 md:space-x-3 lg:space-x-4 space-x-reverse flex-row-reverse">
                {menuItems.map((item, index) => (
                  <DropdownMenu item={item} key={index} />
                ))}
                <button className="text-primary text-xs md:text-sm font-medium hover:text-primary-hover whitespace-nowrap mr-5">
                  !حراج
                </button>
              </nav>

              <SearchBox />
            </div>
          </div>
        </div>
      </header>

      <PromoBanner />
    </>
  );
};

export default Header;