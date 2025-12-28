// types/inputTypes.ts
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  icon?: LucideIcon;
  onIconClick?: () => void;
  onlyNumbers?: boolean;
  forceRTL?: boolean;
  formatter?: (value: string) => string;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  errorClassName?: string;
}

export interface FormikTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  errorClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  autoGrow?: boolean;
}