"use client";

import * as React from "react";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

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

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Props {
  items?: { id: number; name: string }[];
}

const DropdownMenuCheckboxes = ({
  items = [
    { id: 1, name: "ورزشی" },
    { id: 2, name: "هنری" },
    { id: 3, name: "علمی" },
    { id: 4, name: "تفریحی" },
  ]
}: Props) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [open , setOpen] = useState(false);

  const toggleChecked = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <DropdownButton className={open ? "shadow-none translate-y-[3px]" : ""} backgroundColor="bg-[var(--color-blue-main)]">
            فیلتر{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
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
        <DropdownMenuLabel className="text-[var(--color-orange-main)]" dir="rtl">دسته‌بندی</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuCheckboxItem dir="rtl" key={item.id} checked={!!checkedItems[item.id]} onCheckedChange={() => toggleChecked(item.id)}>{item.name}</DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCheckboxes;
