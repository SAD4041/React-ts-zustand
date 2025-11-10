"use client";

import * as React from "react";
import { DropdownMenuItem, type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import CustomButton from "./CustomButton";
import DropdownButton from "./DropdownButton";
import CustomCheckbox from "./CustomCheckbox";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Props {
  items: { id: number; name: string }[];
  checkedCategories: { [key: number]: boolean };
  setCheckedCategories: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
}

const CustomDropdown = ({
  items,
  checkedCategories,
  setCheckedCategories,
}: Props) => {
  // const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [open, setOpen] = useState(false);
  const toggleChecked = (id: number) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <DropdownButton
          className={open ? "shadow-none translate-y-[3px] w-full" : "w-full"}
          backgroundColor="bg-secondary"
        >
          فیلتر{" "}
          <svg
            className={`w-2.5 h-2.5 ms-3 transform transition-transform duration-200 ease-in-out ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </DropdownButton>
        {/* </button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel
          className="text-primary"
          dir="rtl"
        >
          دسته‌بندی
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem
            dir="rtl"
            key={item.id}
            onSelect={(event) => {
              event.preventDefault(); // Prevents close on item click
              toggleChecked(item.id);
            }}
            className="flex items-center justify-between cursor-pointer hover:outline-none hover:bg-neutral-gray"
          >
            <span>{item.name}</span>
            <CustomCheckbox name={item.id.toString()} viewOnly={{ isViewOnly: true, checked: !!checkedCategories[item.id] }} />
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="flex justify-center text-red-500 cursor-pointer hover:outline-none hover:bg-neutral-gray"
          dir="rtl"
          onSelect={(event) => {
            event.preventDefault(); // Prevents close on clear filter click
            setCheckedCategories(
              Object.fromEntries(items.map((category) => [category.id, false]))
            );
          }}
        >
          پاک‌سازی فیلتر
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
