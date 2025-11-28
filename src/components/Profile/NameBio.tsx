import type React from "react";
import { defaultLocale } from "yup";

interface NameBioProps {
  fullName: string;
  bio: string;
}
export default function NameBio({ fullName, bio }: NameBioProps) {
  return (
    <div className="px-2">
      <p className="mb-2 text-profile-title-size text-right font-medium md:text-2xl text-black-500">
        {fullName}
      </p>

      <p className="text-profile-paragraph-size text-right sm:text-sm md:text-base text-black-500">
        {bio}
      </p>
    </div>
  );
}
