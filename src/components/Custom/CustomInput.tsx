import { forwardRef } from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";
import type { FormikInputProps } from "@/types/CustomInputTypes";

const isRTL = (text: string | undefined): boolean => {
  if (!text) return true;
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
};

export const Input = forwardRef<
  HTMLInputElement,
  FormikInputProps & { forceRTL?: boolean }
>(
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
      ...props
    },
    ref
  ) => {
    const [field, meta] = useField(props.name);
    const hasError = meta.touched && meta.error;
    const value = field.value ?? "";

    const isRightToLeft = forceRTL || isRTL(value);

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
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
            {...field}
            {...props}
            ref={ref}
            dir={isRightToLeft ? "rtl" : "ltr"}
            onChange={(e) => {
              const newValue = e.target.value;
              if (onlyNumbers && !/^\d*$/.test(newValue)) return;
              field.onChange(e);
            }}
            className={cn(
              `w-full px-4 py-2 rounded-md border border-input bg-card text-foreground 
               placeholder:text-muted-foreground focus:outline-none 
               focus:ring-2 focus:ring-ring/50 focus:border-primary transition`,
              Icon ? "pl-10" : "",
              isRightToLeft ? "text-right" : "text-left",
              inputClassName
            )}
          />
        </div>

        {hasError && (
          <span className={cn("text-sm text-destructive", errorClassName)}>
            {meta.error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
