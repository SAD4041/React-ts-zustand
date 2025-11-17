import * as React from "react";
import { cn } from "@/lib/utils";

// تعریف پروپ‌های دکمه
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

// تعریف استایل‌های وریانت‌ها
const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 focus:outline-none",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:outline-none",
  outline:
    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-400 focus:outline-none",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 focus:outline-none",
  ghost:
    "hover:bg-gray-100 text-gray-900 focus:ring-gray-300 focus:outline-none",
};

// تعریف استایل‌های سایزها
const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2 text-sm font-medium rounded-lg",
  sm: "h-9 px-3 text-xs font-medium rounded-md",
  lg: "h-11 px-8 text-base font-medium rounded-lg",
  icon: "h-10 w-10 p-0 rounded-lg",
};

// کامپوننت Button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;