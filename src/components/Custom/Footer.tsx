import { Mail, Instagram, Send } from "lucide-react";
import cesa from "@/assets/CESA.svg";
import uni from "@/assets/UNi.png";
import elmocpc from "@/assets/ELMOCPC.svg";
import extraLogo from "@/assets/yektanet.svg";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="py-12 border-t border-white/20 bg-gradient-to-t from-black/40 to-black/20 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Section - Logos */}
          <div className="flex flex-col items-center lg:items-start gap-6 order-2 lg:order-1">
            <div className="flex items-center gap-8 flex-wrap justify-center">
              <img
                src={cesa}
                alt="CESA"
                className="h-20 lg:h-24 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
              <img
                src={uni}
                alt="UNI"
                className="h-20 lg:h-24 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
              <img
                src={extraLogo}
                alt="Extra Logo"
                className="h-10 lg:h-12 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Center Logo - Absolute Center */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <div className="relative group">
              <img
                src={elmocpc}
                alt="ELMOCPC"
                className="h-16 lg:h-20 opacity-95 hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD500]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          </div>

          {/* Right Section - Contact */}
          <div
            className="text-center lg:text-left order-3 lg:order-3"
            dir="ltr"
          >
            <h3 className="text-2xl font-bold text-white mb-3 text-center bg-gradient-to-r from-[#FFD500] to-amber-200 bg-clip-text ">
              تماس با ما
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              برای اطللاعات بيشتر با ما در ارتباط باشید
            </p>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-end gap-6">
              <a
                href="mailto:Elmocpc@outlook.com"
                className="group flex flex-col items-center text-gray-400 hover:text-[#FFD500] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#FFD500]/10 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs mt-2">ایمیل</span>
              </a>

              <a
                href="https://t.me/iustacm"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-gray-400 hover:text-[#FFD500] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#FFD500]/10 group-hover:scale-110 transition-all duration-300">
                  <Send className="w-6 h-6" />
                </div>
                <span className="text-xs mt-2">تلگرام</span>
              </a>

              <a
                href="https://instagram.com/cesa_iust"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-gray-400 hover:text-[#FFD500] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#FFD500]/10 group-hover:scale-110 transition-all duration-300">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-xs mt-2">اینستاگرام</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 mb-2 text-sm lg:text-base">
            <span className="font-semibold text-gray-300">ELMOCPC 2025 ©</span>{" "}
            - تمامی حقوق محفوظ است
          </p>
          <p className="text-gray-500 text-xs lg:text-sm">
            ELMOCPC - Computer Engineering Scientific Associate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;