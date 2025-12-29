import FooterBg from '@/assets/Group-2.png';
import logo from '@/assets/logo.png';
import shieldIcon from '@/assets/shield.png';
import boxIcon from '@/assets/box.png';
import headsetIcon from '@/assets/headphone.png';
import catGif from '@/assets/cat.gif';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center border-t border-muted mt-20 px-6 py-16 md:px-14"
      style={{ backgroundImage: `url(${FooterBg})` }}
    >
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg p-4 md:-top-20 md:left-28 md:translate-x-0 md:p-5">
        <img
          src={logo}
          alt="Logo"
          className="h-24 w-24 md:h-32 md:w-32"
        />
      </div>

      <div className="h-full flex flex-col items-center justify-center gap-8 pt-10 text-center md:flex-row md:items-start md:gap-10 md:pt-6">

        <div className="flex flex-col items-center w-full max-w-xs">
          <img src={shieldIcon} className="h-20 w-20 mb-3" />
          <span className="text-base text-muted-foreground mb-3">
            ضمانت اصالت کالا
          </span>
          <h3 className="text-xl font-semibold mb-3 mt-2">
            خرید از باک گالری
          </h3>
          <ul className="space-y-2 text-lg mt-2">
            <li className="cursor-pointer hover:font-semibold">
              <Link to="/products-list" className="block">زنانه</Link>
            </li>
            <li className="cursor-pointer hover:font-semibold">
              <Link to="/products-list" className="block">مردانه</Link>
            </li>
            <li className="cursor-pointer hover:font-semibold">
              <Link to="/products-list" className="block">بچگانه</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center w-full max-w-xs">
          <img src={boxIcon} className="h-20 w-20 mb-3" />
          <span className="text-base text-muted-foreground mb-3">
            ارسال سریع
          </span>
          <h3 className="text-xl font-semibold mb-3 mt-2">
            خدمات مشتریان
          </h3>
          <ul className="space-y-2 text-lg mt-2">
            <li className="cursor-pointer hover:font-semibold">
              <Link to="/FAQ" className="block">سوالات متداول</Link>
            </li>
            <li className="cursor-pointer hover:font-semibold">راهنمای خرید</li>
            <li className="cursor-pointer hover:font-semibold">حریم خصوصی</li>
          </ul>
        </div>

        <div className="flex flex-col items-center w-full max-w-xs">
          <img src={headsetIcon} className="h-20 w-20 mb-3" />
          <span className="text-base text-muted-foreground mb-3">
            پشتیبانی 24 ساعته
          </span>
          <h3 className="text-xl font-semibold mb-3 mt-2">
            درباره باک گالری
          </h3>
          <ul className="space-y-2 text-lg mt-2">
            <Link to="/aboutus" className="block">درباره ما</Link>
            <Link to="/ContactUs" className="block">تماس با ما</Link>
          </ul>
        </div>

      </div>

      <img
        src={catGif}
        alt="Cat"
        className="absolute bottom-0 right-4 h-40 w-40 md:right-20 md:h-56 md:w-56 hidden md:block"
      />
    </footer>
  );
};

export default Footer;
