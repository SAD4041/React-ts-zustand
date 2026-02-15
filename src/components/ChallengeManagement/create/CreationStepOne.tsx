// components/ChallengeManagement/create/CreationStepOne.tsx
import React from "react";
import { Upload } from "lucide-react";
import TitleAndDescription from "@/components/ChallengeManagement/create/TitleAndDescription";
import type { StepOneProps } from "@/types/challengeCreateTypes";



const Step1BasicInfo: React.FC<StepOneProps> = ({
  title,
  description,
  image,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
  errors,
}) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onImageChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-xl relative space-y-8">
      {/* پاس دادن خطاها به TitleAndDescription */}
      <TitleAndDescription
        title={title}
        onTitleChange={onTitleChange}
        description={description}
        onDescriptionChange={onDescriptionChange}
        errors={errors}
      />

      {/* آپلود تصویر */}
      <div className="mt-6">
        <div
          className="flex justify-center items-center bg-primary-picture-background p-10 cursor-pointer rounded-primary-radius border-2 border-black border-dotted transition-all"
          onClick={() => document.getElementById("imgUpload")?.click()}
        >
          <input id="imgUpload" type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {!image ? (
            <div className="flex flex-col items-center">
              <Upload className="text-primary text-4xl mb-4" />
              <span className="text-primary text-xl font-medium">اضافه کردن عکس</span>
              <p className="text-sm text-gray-text mt-2">می‌تونی بعداً هم اضافه کنی</p>
            </div>
          ) : (
            <img src={image} alt="پیش‌نمایش" className="max-h-64 rounded-primary-radius shadow-lg" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;