import * as React from "react";
import { cn } from "@/lib/utils";
import SubmitSpinner from "../login/submitSpinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "dialog" | "slider" | "simple";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-primary text-white hover:bg-primary/80",
  simple: "bg-white text-black hover:bg-gray-300",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  ghost: "hover:bg-gray-100 text-gray-900",
  link: "text-blue-600 underline-offset-4 hover:underline",
  dialog: "w-full max-w-xs bg-black text-white text-md py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg disabled:bg-gray-4 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer",
  slider: "text-white bg-gradient-to-r from-bg-section1 to-bg-section2 rounded-full shadow-sm hover:opacity-90 transition cursor-pointer",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 rounded-md",
  lg: "h-11 px-8 rounded-md",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      type,
      disabled: disabledProp,
      children,
      ...props
    },
    ref
  ) => {
    const isSubmitLoading = type === "submit" && loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={loading || disabledProp}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isSubmitLoading ? <SubmitSpinner /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
