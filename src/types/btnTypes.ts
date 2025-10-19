import type { ReactNode } from "react";

export interface CustomBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  children: ReactNode;
}
