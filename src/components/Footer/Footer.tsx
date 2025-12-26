import FooterBg from '@/assets/Group-2.png';
import logo from '@/assets/logo.png';
import shieldIcon from '@/assets/shield.png';
import boxIcon from '@/assets/box.png';
import headsetIcon from '@/assets/headphone.png';
import catGif from '@/assets/cat.gif';

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center h-80 px-14 border-t border-muted mt-20"
      style={{ backgroundImage: `url(${FooterBg})` }}
    >
      <div className="absolute -top-20 left-30 bg-white rounded-full shadow-lg p-5">
        <img
          src={logo}
          alt="Logo"
          className="h-32 w-32"
        />
      </div>

      <div className="h-full flex items-start justify-center gap-10 pt-6">

        <div className="flex flex-col items-center text-center w-56">
          <img src={shieldIcon} className="h-20 w-20 mb-3" />
          <span className="text-base text-muted-foreground mb-3">
            ضمانت اصالت کالا
          </span>
          <h3 className="text-xl font-semibold mb-3 mt-2">
            خرید از باک گالری
          </h3>
          <ul className="space-y-2 text-lg mt-2">
            <li className="cursor-pointer hover:font-semibold">زنانه</li>
            <li className="cursor-pointer hover:font-semibold">مردانه</li>
            <li className="cursor-pointer hover:font-semibold">بچگانه</li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center w-56">
          <img src={boxIcon} className="h-20 w-20 mb-3" />
          <span className="text-base text-muted-foreground mb-3">
            ارسال سریع
          </span>
          <h3 className="text-xl font-semibold mb-3 mt-2">
            خدمات مشتریان
          </h3>
          <ul className="space-y-2 text-lg mt-2">
            <li className="cursor-pointer hover:font-semibold">سوالات متداول</li>
            <li className="cursor-pointer hover:font-semibold">راهنمای خرید</li>
            <li className="cursor-pointer hover:font-semibold">حریم خصوصی</li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center w-56">
          <img src={headsetIcon} className="h-20 w-20 mb-3" />
          <span className="text-base text-muted-foreground mb-3">
            پشتیبانی 24 ساعته
          </span>
          <h3 className="text-xl font-semibold mb-3 mt-2">
            درباره باک گالری
          </h3>
          <ul className="space-y-2 text-lg mt-2">
            <li className="cursor-pointer hover:font-semibold">درباره ما</li>
            <li className="cursor-pointer hover:font-semibold">تماس با ما</li>
          </ul>
        </div>

      </div>

      <img
        src={catGif}
        alt="Cat"
        className="absolute bottom-0 right-20 h-56 w-56"
      />
    </footer>
  );
};

export default Footer;
