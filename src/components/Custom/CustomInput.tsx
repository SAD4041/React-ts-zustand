import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { Field, type FieldProps } from "formik";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  icon?: ReactNode;
  onIconClick?: () => void;
};

export default function CustomInput({
  label = "متن",
  name,
  icon = null,
  onIconClick,
  type = "text",
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const hasValue = field.value?.length > 0;
        const isFloating = isFocused || hasValue;
        const hasError = meta.touched && meta.error;

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          props.onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          field.onBlur(e);
          props.onBlur?.(e);
        };

        return (
          <div className="flex flex-col w-full" style={{ width: "100%" }}>
            <div className="relative">
              <Input
                {...field}
                {...props}
                type={inputType}
                onFocus={handleFocus}
                onBlur={handleBlur}
                dir="rtl"
                className={`
    border !border-white
    !bg-transparent text-white placeholder:text-gray-300
    focus:!border-white
    focus:!ring-0 focus-visible:!ring-0
    p-0 rounded-xl h-10 w-full
    text-right pr-4 ${icon ? "pl-12" : ""}
    transition-all duration-200 ease-in-out
    h-11
    ${hasError ? "!border-white" : ""}
    ${props.className ?? ""}
  `}
              />

              {icon && (
                <div
                  className={`
                    absolute top-1/2 -translate-y-1/2 text-white-500 cursor-pointer
                    ${"left-4"}
                  `}
                  onClick={onIconClick}
                >
                  {icon}
                </div>
              )}

              <label
                className={`
                  absolute pointer-events-none transition-all duration-200 ease-in-out font-bold
                  ${"right-4"}
                  ${
                    isFloating
                      ? "top-[-10px] text-xs bg-[#00274D] px-1 text-white"
                      : "top-1/2 -translate-y-1/2 text-sm text-white"
                  }
                `}
              >
                {label}
              </label>
            </div>

            {hasError && (
              <div className={`mt-1 text-xs ${"pr-4 text-right"}`}>
                <p className="text-red-200">{meta.error}</p>
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
}
