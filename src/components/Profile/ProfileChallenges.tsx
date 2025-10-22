import React, { useState } from "react";
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
import { Search } from "lucide-react";

import CustomDropdown from "../Custom/CustomDropdown";
const ProfileChallenges = () => {
  const challenges = [
    { id: 1, name: "چالش یک", categoryID: 1, category: "ورزشی" },
    { id: 5, name: "چالش", categoryID: 1, category: "ورزشی" },
    { id: 6, name: "یک", categoryID: 1, category: "ورزشی" },
    { id: 2, name: "چالش دو", categoryID: 3, category: "علمی" },
    { id: 3, name: "چالش سه", categoryID: 2, category: "هنری" },
    { id: 4, name: "چالش چهار", categoryID: 4, category: "تفریحی" },
  ];
  const categories = [
    { id: 1, name: "ورزشی" },
    { id: 2, name: "هنری" },
    { id: 3, name: "علمی" },
    { id: 4, name: "تفریحی" },
  ];
  const [checkedCategories, setCheckedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [search, setSearch] = useState("");
  const selectedCategoryIds = Object.keys(checkedCategories)
    .filter((key) => checkedCategories[Number(key)])
    .map(Number);

  const searchedChallenges = search
    ? challenges
        .filter((challenge) =>
          challenge.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const s = search.toLowerCase();

          // scoring
          const score = (name: string) => {
            if (name === s) return 3;
            if (name.startsWith(s)) return 2;
            return 1;
          };

          return score(bName) - score(aName);
        })
    : challenges;

  const filteredChallenges =
    selectedCategoryIds.length === 0
      ? searchedChallenges
      : searchedChallenges.filter((ch) =>
          selectedCategoryIds.includes(ch.categoryID)
        );
  return (
    <>
      <div className="flex justify-start items-center m-2.5 gap-2 w-full">
        <Formik
          initialValues={{ challengeSearch: "" }}
          onSubmit={(values) => {
            setSearch(values.challengeSearch);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="relative w-72 flex items-center"
            >
              <CustomInput
                icon={
                    <button type="submit" className="flex items-center cursor-pointer">
                      <Search className="text-[var(--color-blue-main)]" />
                    </button>
                }
                name="challengeSearch"
                label="جستجو"
                className="pr-10"
              />
            </Form>
          )}
        </Formik>
        <CustomDropdown
          items={categories}
          checkedCategories={checkedCategories}
          setCheckedCategories={setCheckedCategories}
        ></CustomDropdown>
      </div>
      {filteredChallenges.map((challenge) => (
        <Card
          className="cursor-pointer m-2.5"
          onClick={() => console.log("meowww and move me to the page")}
        >
          <CardHeader>
            <CardTitle>{challenge.name}</CardTitle>
            <CardDescription>{challenge.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>meow</p>
          </CardContent>
          <CardFooter>
            <p>Click to participate</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProfileChallenges;
