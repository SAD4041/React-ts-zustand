import React from "react";
import { Upload } from "lucide-react";
import TitleAndDescription from "@/components/ChallengeManagement/create/TitleAndDescription";

interface Props {
  title: string;
  description: string;
  image: string | null;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onImageChange: (v: string | null) => void;
}

const Step1BasicInfo: React.FC<Props> = ({
  title,
  description,
  image,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
}) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onImageChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-xl relative">
      <TitleAndDescription
        title={title}
        onTitleChange={onTitleChange}
        description={description}
        onDescriptionChange={onDescriptionChange}
      />

      <div
        className="mt-3 flex justify-center items-center bg-[#FFF1E5] p-10 cursor-pointer rounded-[8px] border-2 border-black border-dotted"
        onClick={() => document.getElementById("imgUpload")?.click()}
      >
        <input
          id="imgUpload"
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        {!image ? (
          <div className="flex flex-col items-center">
            <Upload className="text-primary text-4xl mb-4" />
            <span className="text-primary text-xl font-medium">اضافه کردن عکس</span>
          </div>
        ) : (
          <img src={image} alt="preview" className="w-full h-auto border-2" />
        )}
      </div>
    </div>
  );
};

export default Step1BasicInfo;