import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import CustomButton from "../Custom/CustomButton";
const ProfileChallenges = () => {
  return (
    <>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="جستجو..."
          className="border-2 mt-2 mb-2 border-[var(--color-blue-main)] rounded-md w-full pr-10 pl-3 py-2 focus:outline-none"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          🔍
        </button>
      </div>

      <Card onClick={() => console.log("meowww and move me to the page")}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfileChallenges;
