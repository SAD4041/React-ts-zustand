import { useMobile } from "@/hooks/ResponsiveHooks";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetRegisterForm from "../PetRegister/PetRegisterForm";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { isMotionComponent } from "framer-motion";

function CardStyle() {
  return (
    <div className="border-4 border-primary border-dotted w-full h-80 bg-primary-200 flex-col rounded-lg flex justify-center items-center text-primary hover:cursor-pointer">
      <Plus size={70} strokeWidth={2} />
      <p className="text-2xl font-bold mt-4">اضافه کردن پت</p>
    </div>
  );
}

export default function AddPetCard() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (isMobile) {
      navigate("/RegisterPet");
      window.scrollTo(0, 0);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div onClick={handleOpen}>
        <CardStyle />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-200 h-[90%]" dir="rtl">
          <PetRegisterForm closeModal={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

