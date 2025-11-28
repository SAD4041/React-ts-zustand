// BrandProfileHeader.jsx
import shareIcon from '../assets/brand-dashboard/Send_light.png';
import shopIcon from '../assets/brand-dashboard/Shop.png';
import locationIcon from '../assets/brand-dashboard/Pin_alt_light.png';
import phoneIcon from '../assets/brand-dashboard/Phone.png';
import emailIcon from '../assets/brand-dashboard/Message.png';
import calendarIcon from '../assets/brand-dashboard/Date_today.png';
import starIcon from '../assets/brand-dashboard/Star.png';
import ProductCard from '@/components/Product/ProductCard';
import Tshirt from '@/assets/image1.png'
import Comments from '@/components/BrandProfile/Comments';

const BrandDashboard = () => {
  // change it with dynamic data    داده‌های ماک شده
  const brandData = {
    name: "برند مدآواران",
    slogan: '"مد امروز، سبک فردا"',
    rating: 4.8,
    followers: 23456,
    sales: 45678,
    isOfficial: true,
    coverImage: "https://via.placeholder.com/1200x300?text=Cover+Image",
    avatar: "https://via.placeholder.com/150?text=Brand",
    location: "تهران، ایران",
    phone: "۰۲۱-۱۲۳۴۵۶۷۸",
    email: "info@modavaran.com",
    since: "عضو از فروردین ۱۳۹۵",
    description: "برند مدآواران با هدف ارائه پوشاک باکیفیت و مدرن تاسیس شده است. ما با تمرکز بر کیفیت، طراحی منحصر به فرد و قیمت‌گذاری منصفانه، تلاش می‌کنیم بهترین تجربه خرید را برای مشتریان فراهم کنیم. از لباس‌های روزمره تا ست‌های خاص، همه چیز در جند کلیک فاصله تا تو. ما با ضمانت بازگشت و ارسال سریع، کنارتاییم.",
    promotion: {
      discount: "۵۰٪",
      title: "تخفیف تا ۵۰٪",
      subtitle: "روی کالکشن بهار و تابستان",
    }
  };

  return (
    <div dir="rtl" className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-50 bg-gray-200">
        <img
          src={brandData.coverImage}
          alt="Cover Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* بخش اطلاعات اصلی برند - هدر */}
      <div className="mb-[50px] px-6 py-4 border relative">
        <div className="absolute -top-14 right-6">
          <img
            src={brandData.avatar}
            alt={brandData.name}
            className="w-25 h-25 rounded-full border-4 border-white shadow-lg"
          />
          {brandData.isOfficial && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <div className="pt-10 flex items-start gap-6 justify-between">
          <div className="flex-1 flex items-start gap-30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-800">{brandData.name}</h1>
                {brandData.isOfficial && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">برند رسمی</span>
                )}
              </div>
              <p className="text-sm text-gray-600 italic mb-3">{brandData.slogan}</p>
            </div>

            {/* اطلاعات عددی - کنار هم و با خط جداکننده */}
            <div className="flex items-center pt-2 gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-full font-semibold">{brandData.sales}</div>
                <div>فروش</div>
              </div>
              <div className="border-l border-gray-300 mx-2 h-6"></div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{brandData.followers}</span>
                <span>دنبال کننده</span>
              </div>
              <div className="border-l border-gray-300 mx-2 h-6"></div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{brandData.rating}</span>
                <img src={starIcon} alt="امتیاز" className="h-5 w-5" />
                <span>امتیاز</span>
              </div>
            </div>
          </div>

          {/* سمت چپ: دکمه‌ها */}
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full flex items-center gap-1 text-sm">
              <img src={shopIcon} alt="دنبال کردن" className="h-7 w-7" />
              دنبال کردن
            </button>
            <button className="font-medium py-2 px-4 rounded-full border flex items-center gap-1 text-sm">
              <img src={shareIcon} alt="اشتراک" className="h-7 w-7" />
              اشتراک گذاری
            </button>
          </div>
        </div>
      </div>

      {/* بخش درباره برند و اطلاعات تماس - به صورت کارت */}
      <div className="mx-[150px] mt-6 rounded-2xl overflow-hidden border shadow-lg">

        <div className="bg-[#F2F2F2] px-5 py-5 border-b border-gray-200 height-[200px]">
          <h2 className="text-lg text-center font-semibold text-gray-800">درباره برند و اطلاعات تماس</h2>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mt-8 text-gray-700 leading-relaxed col-span-2">
            <p>{brandData.description}</p>
            <p className="mt-2 font-medium">مدآواران: هماهنگ با ریتم زندگی تو!</p>
          </div>
          <div className="space-y-3 col-span-1">
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={locationIcon} alt="موقعیت" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.location}</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={phoneIcon} alt="تلفن" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.phone}</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={emailIcon} alt="ایمیل" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.email}</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="bg-[#F2F2F2] p-2 rounded-full">
                <img src={calendarIcon} alt="تاریخ" className="h-7 w-7 text-gray-600" />
              </div>
              <span className="text-gray-700">{brandData.since}</span>
            </div>
          </div>
        </div>
      </div>

      {/* بخش تبلیغاتی */}
      {/* بخش تبلیغاتی - قرمز */}
      <div className="mt-[100px] mx-[150px] p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white">
        <div className='flex'>
          <div className="items-start my-3 mx-7">
            <div className="mb-4 w-25 bg-white text-red-500 text-l font-bold px-2 py-2 rounded-full">
              فروش ویژه!
            </div>
            <div className="my-4 text-xl font-bold">{brandData.promotion.title}</div>
            <div className="my-4 text-2xl mt-1">{brandData.promotion.subtitle}</div>

          </div>


          <div className="relative mt-4">
            {/* اسلایدر محصولات */}
            <div className="overflow-x-hidden px-4">
              {[
                {
                  id: 1,
                  name: "تیشرت CATWAREHOUSE",
                  model: "Bussiness Not Boomin",
                  price: 699999,
                  discountedPrice: 531999,
                  discount: 24,
                  hasDiscount: true,
                  image: Tshirt,
                  sizes: [
                    { label: "XS" },
                    { label: "S" },
                    { label: "M" },
                    { label: "L" },
                    { label: "XL" },
                    { label: "2XL" },
                    { label: "3XL" }
                  ],
                  colors: [
                    { hex: "#FF6B6B", label: "قرمز" },
                    { hex: "#4ECDC4", label: "فیروزه‌ای" },
                    { hex: "#45B7D1", label: "آبی" },
                    { hex: "#96CEB4", label: "سبز" }
                  ],
                  stock: 8,
                  rating: 4.5,
                  ratingCount: 120,
                  sales: 45
                },
                {
                  id: 2,
                  name: "تیشرت CATWAREHOUSE",
                  model: "Bussiness Not Boomin",
                  price: 699999,
                  discountedPrice: 531999,
                  discount: 24,
                  hasDiscount: true,
                  image: Tshirt,
                  sizes: [
                    { label: "XS" },
                    { label: "S" },
                    { label: "M" },
                    { label: "L" },
                    { label: "XL" },
                    { label: "2XL" },
                    { label: "3XL" }
                  ],
                  colors: [
                    { hex: "#FF6B6B", label: "قرمز" },
                    { hex: "#4ECDC4", label: "فیروزه‌ای" },
                    { hex: "#45B7D1", label: "آبی" },
                    { hex: "#96CEB4", label: "سبز" }
                  ],
                  stock: 5,
                  rating: 4.3,
                  ratingCount: 89,
                  sales: 32
                },
                {
                  id: 3,
                  name: "تیشرت CATWAREHOUSE",
                  model: "Bussiness Not Boomin",
                  price: 699999,
                  discountedPrice: 531999,
                  discount: 24,
                  hasDiscount: true,
                  image: Tshirt,
                  sizes: [
                    { label: "XS" },
                    { label: "S" },
                    { label: "M" },
                    { label: "L" },
                    { label: "XL" },
                    { label: "2XL" },
                    { label: "3XL" }
                  ],
                  colors: [
                    { hex: "#FF6B6B", label: "قرمز" },
                    { hex: "#4ECDC4", label: "فیروزه‌ای" },
                    { hex: "#45B7D1", label: "آبی" },
                    { hex: "#96CEB4", label: "سبز" }
                  ],
                  stock: 12,
                  rating: 4.7,
                  ratingCount: 156,
                  sales: 67
                }
              ].map((product) => (
                <div key={product.id} className="inline-block mx-3 cursor-pointer">
                  <a href=''><ProductCard product={product} /></a>
                  {/* change it to product detail */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <a href='/'> 
        {/* change it to brand's products offer */}
          <button className="w-3/4 mt-3 mx-auto block bg-white text-red-500 font-medium py-2 rounded-md hover:bg-gray-100 transition-colors text-center cursor-pointer">
            مشاهده محصولات
          </button>
        </a>


      </div>
      <Comments />

      <div className='my-10'></div>
      <div className='my-10'></div>
    </div>
  );
};

export default BrandDashboard;