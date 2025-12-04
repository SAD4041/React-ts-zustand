import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
export interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  icon?: LucideIcon;
  onIconClick?: () => void;
  onlyNumbers?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  errorClassName?: string;
}