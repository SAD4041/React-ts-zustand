import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useState, useEffect } from "react";
import { Field, type FieldProps } from "formik";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  width? : string;
};

export default function CustomInput({
  label = "متن",
  name,
  icon = null,
  onIconClick,
  type = "text",
  width = "",
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isRTL, setIsRTL] = useState(true);

  const inputType = type;

  const detectRTL = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const hasValue = field.value?.length > 0;
        const isFloating = isFocused || hasValue;
        const hasError = meta.touched && meta.error;

        useEffect(() => {
          if (field.value !== undefined && field.value !== null) {
            setIsRTL(detectRTL(field.value));
          }
        }, [field.value]);

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
          <div className={"flex flex-col " + width}>
            <div className="relative">
              <Input
                {...field}
                {...props}
                type={inputType}
                onFocus={handleFocus}
                onBlur={handleBlur}
                dir={isRTL ? "rtl" : "ltr"}
                className={`
                  border !border-[var(--borderDefault)]
                  shadow-[0px_1px_0px_var(--borderDefault)]
                  focus:!border-[var(--borderFoucus)]
                  focus:!shadow-[0px_1px_0px_var(--borderFoucusShadow)]
                  focus:!ring-0 focus-visible:!ring-0
                  p-0 rounded-xl h-10 w-full
                  ${isRTL ? "text-right pr-4" : "text-left pl-4 pr-3"}
                  ${icon ? "pl-12" : ""} 
                  transition-all duration-200 ease-in-out
                  ${hasError
                    ? "!border-[var(--borderInvalid)] shadow-[0px_1px_0px_var(--borderInvalidShadow)]"
                    : ""}
                  ${props.className ?? ""}
                `}
              />


              {icon && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer
                    ${"left-4"}`} 
                  onClick={onIconClick}
                >
                  {icon}
                </div>
              )}

              <label
                className={`
                  absolute pointer-events-none transition-all duration-200 ease-in-out font-bold
                  ${"right-4" }
                  ${
                    isFloating
                      ? "top-[-10px] text-xs bg-white px-1 text-black"
                      : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
                  }
                `}
              >
                {label}
              </label>
            </div>

            {hasError && (
              <div
                className={`mt-1 text-xs ${"pr-4 text-right"}`}
              >
                <p className="text-red-500">{meta.error}</p>
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
}
