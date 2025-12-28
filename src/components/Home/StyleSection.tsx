import { fallbackStylePalettes, modelImages } from "@/data/homePageData";
import { Link } from "react-router-dom";

const StyleSection = () =>{
    const style_palettes = fallbackStylePalettes;

    return (
        <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">خرید بر اساس استایل</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* بخش کلاسیک */}
            <div className="md:w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
              <Link to={`/style/classic`} className="block aspect-[3/4]">
                <div className="absolute inset-0 z-0">
                  <img
                    src={style_palettes[0]?.image_url || style1}
                    alt="پس‌زمینه کلاسیک"
                    className="w-full h-[80%] object-cover"
                  />
                </div>

                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <img
                    src= {modelImages[0]}
                    alt="مدل کلاسیک"
                    className="w-[70%] h-[70%] object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="absolute bottom-4 right-4 z-20 text-black text-xl font-bold  px-3 py-1 rounded">
                  کلاسیک
                </p>
              </Link>
            </div>

            <div className="md:w-1/2 flex flex-col gap-4">
              <div className="flex gap-4">
                {/* اسپرت */}
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/sport`} className="block aspect-square">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={style_palettes[1]?.image_url || style2}
                        alt="پس‌زمینه اسپرت"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <img
                        src={modelImages[1]}
                        alt="مدل اسپرت"
                        className="w-[60%] h-[60%] object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="absolute bottom-4 right-4 z-20 text-black text-lg font-bold px-2 py-1 rounded">
                      اسپرت
                    </p>
                  </Link>
                </div>

                {/* استریت */}
                <div className="w-1/2 relative group cursor-pointer overflow-hidden rounded-xl">
                  <Link to={`/style/street`} className="block aspect-square">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={style_palettes[2]?.image_url || style3}
                        alt="پس‌زمینه استریت"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <img
                        src={modelImages[2]}
                        alt="مدل استریت"
                        className="w-[60%] h-[60%] object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="absolute bottom-4 right-4 z-20 text-black text-lg font-bold px-2 py-1 rounded">
                      استریت
                    </p>
                  </Link>
                </div>
              </div>

              {/* وینتیج */}
              <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                <Link to={`/style/vintage`} className="block aspect-square">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={style_palettes[3]?.image_url || style4}
                      alt="پس‌زمینه وینتیج"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <img
                      src={modelImages[3]}
                      alt="مدل وینتیج"
                      className="w-[70%] h-[70%] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="absolute bottom-4 right-4 z-20 text-black text-xl font-bold px-3 py-1 rounded">
                    مجلسی
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default StyleSection;