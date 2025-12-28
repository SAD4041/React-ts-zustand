// components/ui/input.tsx 
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  onIconClick?: () => void;
  onlyNumbers?: boolean;
  forceRTL?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  errorClassName?: string;
}

const isRTL = (text: string | undefined): boolean => {
  if (!text) return true;
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon: Icon,
      onIconClick,
      onlyNumbers = false,
      forceRTL = false,
      containerClassName = "",
      inputClassName = "",
      iconClassName = "",
      errorClassName = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const value = props.value ?? "";
    const isRightToLeft = forceRTL || isRTL(String(value));

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label
            className="text-sm font-medium text-foreground"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer",
                iconClassName
              )}
              onClick={onIconClick}
            />
          )}

          <input
            {...props}
            ref={ref}
            dir={isRightToLeft ? "rtl" : "ltr"}
            disabled={disabled}
            className={cn(
              "w-full px-4 py-2 rounded-md border border-input bg-card text-foreground",
              "placeholder:text-muted-foreground focus:outline-none",
              "focus:ring-2 focus:ring-ring/50 focus:border-primary transition",
              Icon ? "pl-10" : "",
              isRightToLeft ? "text-right" : "text-left",
              disabled && "opacity-50 cursor-not-allowed",
              inputClassName
            )}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";