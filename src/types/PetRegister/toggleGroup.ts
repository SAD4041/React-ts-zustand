import type { ElementType } from "react";

type item = {
  name: string;
  icon: ElementType;
  value: string;
};

export type PetKindToggleGroupProps = {
  items: item[];
  name: string;

};

export type IsAdultToggleGroupProps = {
  items: item[];
  name: string;
};