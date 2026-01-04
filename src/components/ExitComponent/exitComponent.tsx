import { useState } from "react";
import catDefault from "@/assets/confusedcat.png";
import catHappy from "@/assets/happycat.png";
import catSad from "@/assets/sadCat.png";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ExitModal() {
  const [hoveredButton, setHoveredButton] = useState<"yes" | "no" | null>(null);

  let currentCatImage = catDefault;
  let mainText = "برنج خیس کردم کجا میخوای بری؟";
  let subText = "واقعا میخوای بری؟؟؟";

  if (hoveredButton === "no") {
    currentCatImage = catHappy;
    mainText = "! هورااا";
  } else if (hoveredButton === "yes") {
    currentCatImage = catSad;
    mainText = "! نرو فاطمه";

  }

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/90">
        خروج
      </DialogTrigger>

      <DialogContent className="font-bold text-center">
        <DialogHeader>
        </DialogHeader>

        <div className="bg-white rounded-lg p-6 text-center">
          <img
            src={currentCatImage}
            alt="گربه"
            className="w-32 h-32 mx-auto mb-4 object-contain"
          />

          <p className="text-xl mb-2">{mainText}</p>
          <p className="text-lg mb-6">{subText}</p>

          <div className="flex gap-4 justify-center">
            <button
              onMouseEnter={() => setHoveredButton("yes")}
              onMouseLeave={() => setHoveredButton(null)}
              className={`w-40 py-3 rounded-lg transition-transform duration-200 bg-gray-300 text-black font-bold ${hoveredButton === "yes" ? "-translate-y-1" : ""
                }`}
            >
              بله
            </button>

            <button
              onMouseEnter={() => setHoveredButton("no")}
              onMouseLeave={() => setHoveredButton(null)}
              className={`w-40 py-3 rounded-lg transition-transform duration-200 bg-cyan-400 text-black font-bold ${hoveredButton === "no" ? "-translate-y-1" : ""
                }`}
            >
              خیر
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
