import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrint, Pencil, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../Button/Button";
import petDefaultImage from "@/assets/images/pet-default-profile.png";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { useFormikContext } from "formik";

interface EditableAvatarProps {
  className?: string;
  name: string;
}

const EditableAvatar: React.FC<EditableAvatarProps> = ({ className, name }) => {
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMobile();

  const formik = useFormikContext<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    formik.setFieldValue(name, file);
    formik.setFieldTouched(name, true, false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
    setOpen(false);
  };

  if (isMobile) {
    return (
      <div
        className={cn(
          "relative group rounded-full cursor-pointer select-none",
          className
        )}
      >
        <Avatar className="w-full h-full shadow-md">
          <AvatarImage
            src={image || petDefaultImage}
            alt="avatar"
            className="object-cover"
          />
          <AvatarFallback>pet image</AvatarFallback>
        </Avatar>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="aspect-square rounded-full h-8 w-8 bg-white justify-center flex items-center absolute -translate-y-[70%]">
              <PenLine className="h-4" />
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center items-center w-fit py-5 px-15 md:px-30 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-10">تغییر پروفایل</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleClick} className="w-40 h-10 text-md">
                انتخاب عکس
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative group rounded-full cursor-pointer select-none",
            className
          )}
        >
          <Avatar className="w-full h-full shadow-md">
            <AvatarImage
              src={image || petDefaultImage}
              alt="avatar"
              className="object-cover"
            />
            <AvatarFallback>pet image</AvatarFallback>
          </Avatar>

          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex items-center justify-center">
            <Pencil className="text-white w-6 h-6" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center w-fit py-5 px-15 md:px-30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-10">تغییر پروفایل</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClick} className="w-40 h-10 text-md">
            انتخاب عکس
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditableAvatar;
