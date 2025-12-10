import { motion } from "framer-motion";
import catPic from '@/assets/Gemini_Generated_Image_muba2rmuba2rmuba 1 (1).png';
import { useNavigate } from "react-router-dom";

export default function Errors500() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-foreground">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <div className="mb-8">
          <img
            src={catPic}
            alt="500 Cat Illustration"
            className="mx-auto w-64 h-64 object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold text-primary mb-4">۵۰۰ ارور</h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          !ظاهرا اون پشت سرورمون به مشکل خورده
        </p>

        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
        >
          بازگشت به خانه اصلی
        </motion.button>
      </motion.div>
    </div>
  );
}
