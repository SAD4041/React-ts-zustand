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
import CustomInput from "../Custom/CustomInput";
import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import { Search } from 'lucide-react';


import CustomDropdown from "../Custom/CustomDropdown";
const ProfileChallenges = () => {
  return (
    <>
      <div className="flex justify-start items-center m-2.5 gap-2 w-full">
        <Formik
          initialValues={{ challengeSearch: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ isSubmitting }) => (
            <Form className="relative w-72 flex items-center">
              <CustomInput
                icon = {<Search className="text-[var(--color-blue-main)]"/>}
                name="challengeSearch"
                label="جستجو"
                className="pr-10" // add padding-right so text doesn't overlap button
              />

              {/* <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <img src={SearchIcon} alt="Search" className="w-4 h-4" />
              </button> */}
            </Form>
          )}
        </Formik>
          <CustomDropdown></CustomDropdown>
      </div>

      <Card className="m-2.5" onClick={() => console.log("meowww and move me to the page")}>
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
