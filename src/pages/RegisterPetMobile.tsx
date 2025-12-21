import PetRegisterForm from "@/components/PetRegister/PetRegisterForm";

import { Redo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPetMobile() {
  const navigate = useNavigate();
  useEffect(() => {
    const htmlPrev = document.documentElement.style.overflow;
    const bodyPrev = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlPrev;
      document.body.style.overflow = bodyPrev;
    };
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="relative flex flex-col items-center w-full pb-6 ">
        <div
          className="p-2 absolute top-6 right-4 text-lg font-semibold flex items-center gap-2 text-gray-800"
          onClick={() => {
            navigate("/Dashboard/pets");
          }}
        >
          <span>
            <Redo2 />
          </span>
        </div>
        <div className="bg-white aspect-square rounded-full w-[200%] mt-[20%] flex-col flex  items-center drop-shadow-2xl">
          <PetRegisterForm />

          {/* <p className="font-bold text-md mt-10">
            نام و عکس پت خود رو وارد کنید
          </p>
          <Avatar className="w-24 h-24 border-2 mt-3"></Avatar>

          <Input></Input>
          <div className="flex justify-center gap-5 mt-20">
            <Button>مرحله بعد</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
