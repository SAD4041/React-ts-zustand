import { Mail, Instagram, Send } from "lucide-react"; // Send رو به عنوان Telegram icon موقت
import cesa from "@/assets/CESA.svg";
import uni from "@/assets/UNI.png";
import elmocpc from "@/assets/ELMOCPC.svg";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="py-8 border-t border-white/10 bg-black/20 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left logos */}
          <div className="flex items-center gap-4 order-1 md:order-1 mt-6 md:mt-0 mb-3">
            <img
              src={cesa}
              alt="Logo 1"
              className="h-30 opacity-80 hover:opacity-100 transition"
            />
            <img
              src={uni}
              alt="Logo 2"
              className="h-30 opacity-80 hover:opacity-100 transition"
            />
          </div>

          {/* Center logo */}
          <div className="flex justify-center flex-1 order-2 md:order-2">
            <img
              src={elmocpc}
              alt="Center Logo"
              className="h-10 opacity-90 hover:opacity-100 transition"
            />
          </div>

          {/* Contact section */}
          <div className="text-center md:text-left order-3 md:order-3 mt-6 md:mt-0">
            <h3 className="text-xl font-bold text-white mb-2">تماس با ما</h3>
            <p className="text-gray-400 mb-4">
              برای اطلاعات بیشتر با ما در ارتباط باشید
            </p>

            <div className="flex justify-center md:justify-end gap-6 text-gray-400 mb-4">
              {/* Mail */}
              <a
                href="mailto:Elmocpc@outlook.com"
                className="hover:text-[#FFD500] transition-colors duration-200"
              >
                <Mail className="w-6 h-6" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/iustacm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD500] transition-colors duration-200"
              >
                <Send className="w-6 h-6" /> {/* اگر SVG واقعی تلگرام داری بهتره import کنی */}
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/cesa_iust"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD500] transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-1">
            © 2025 ELMOCPC - تمامی حقوق محفوظ است
          </p>
          <p className="text-sm text-gray-500">
            Computer Engineering Scientific Associate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
