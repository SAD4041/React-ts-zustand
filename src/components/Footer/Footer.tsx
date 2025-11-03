import FooterBg from '@/assets/Group-2.png';
import logo from '@/assets/logo.png'; 
import shieldIcon from '@/assets/shield.png';
import boxIcon from '@/assets/box.png';
import headsetIcon from '@/assets/headphone.png';
import catGif from '@/assets/cat.gif'; 

const Footer = () => {
  return (
    <footer className="relative bg-cover bg-center py-4 px-6 md:px-16 flex flex-col items-center h-[350px]" 
        style={{ backgroundImage: `url(${FooterBg})` }}>
      <div className="absolute top-0 left-24 -translate-y-1/2 bg-white rounded-full shadow-lg">
        <img 
            src={logo} 
            alt="Logo" 
            className="h-[150px] w-[150px]" 
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-35">
        
        <div className='text-center'>
          <div className="flex items-center gap-2 mb-2 justify-center">
            <img 
                src={shieldIcon} 
                alt="Shield" 
                className="w-[80px] h-[80px]" 
            />
          </div>
          <div className='mb-6'>
            <span className="text-[16px] text-gray-600 ">ضمانت اصالت کالا</span>
          </div>
          <h3 className="text-[22px] font-semibold mb-6">خرید از باک گالری</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-[18px] text-gray-700 hover:text-black hover:font-bold hover:underline transition-all duration-200">زنانه</a></li>
            <li><a href="#" className="text-[18px] text-gray-700 hover:text-black hover:font-bold hover:underline transition-all duration-200">مردانه</a></li>
            <li><a href="#" className="text-[18px] text-gray-700 hover:text-black hover:font-bold hover:underline transition-all duration-200">بچگانه</a></li>
          </ul>
        </div>

        <div className='text-center'>
          <div className="flex items-center gap-2 mb-2 justify-center">
            <img 
                src={boxIcon} 
                alt="Box" 
                className="w-[80px] h-[80px]" 
            />
          </div>
          <div className='mb-6'>
            <span className="text-[16px]">ارسال سریع</span>
          </div>
          <h3 className="text-[22px] font-semibold mb-6">خدمات مشتریان</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-[18px] text-gray-700 hover:text-black hover:font-bold hover:underline transition-all duration-200">سوالات متداول</a></li>
            <li><a href="#" className="text-[18px] text-gray-700 hover:text-black hover:font-bold hover:underline transition-all duration-200">راهنمای خرید</a></li>
            <li><a href="#" className="text-[18px] text-gray-700 hover:text-black hover:font-bold hover:underline transition-all duration-200">حریم خصوصی</a></li>
          </ul>
        </div>

        <div className='text-center'>
          <div className="flex items-center gap-2 mb-2 justify-center">
            <img 
                src={headsetIcon} 
                alt="Headset" 
                className="w-[80px] h-[80px]" 
            />
          </div>
          <div className='mb-6'>
            <span className="text-[16px] text-gray-600">پشتیبانی 24 ساعته</span>
          </div>
          <h3 className="text-[22px] font-semibold mb-6">درباره باک گالری</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-[18px] text-gray-600 hover:text-black hover:font-bold hover:underline transition-all duration-200">درباره ما</a></li>
            <li><a href="#" className="text-[18px] text-gray-600 hover:text-black hover:font-bold hover:underline transition-all duration-200">تماس با ما</a></li>
          </ul>
        </div>

        <div className="hidden xl:block absolute bottom-0 right-0">
          <img 
            src={catGif} 
            alt="Cat animation" 
            className="h-[200px] w-[200px]" 
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;