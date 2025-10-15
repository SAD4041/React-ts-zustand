import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { Field, type FieldProps } from "formik";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  icon_1?: ReactNode;
  icon_2?: ReactNode;
  toggleOnClick?: boolean;
};

export default function CustomInput({
  label = "متن",
  name,
  icon_1 = null,
  icon_2 = null,
  toggleOnClick = true,
  type = "text",
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const inputType =
    type === "password" ? (isToggled ? "text" : "password") : type;

  const handleToggle = () => {
    if (toggleOnClick) setIsToggled((prev) => !prev);
  };

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
          <div className="flex flex-col w-72">
            <div className="relative">
              <Input
                {...field}
                {...props}
                type={inputType}
                onFocus={handleFocus}
                onBlur={handleBlur}
                dir="rtl"
                className={`
                  border !border-[var(--borderDefault)]
                  shadow-[0px_1px_0px_var(--borderDefault)]


                  focus:!border-[var(--borderFoucus)]
                  focus:!shadow-[0px_1px_0px_var(--borderFoucusShadow)]
                  focus:!ring-0
                  focus-visible:!ring-0

                  p-0

                  rounded-xl
                  h-10
                  w-full
                  text-right
                  pr-4
                  ${icon_1 || icon_2 ? "pl-12" : ""}
                  transition-all
                  duration-200
                  ease-in-out
                  ${
                    hasError
                      ? "!border-[var(--borderInvalid)] shadow-[0px_1px_0px_var(--borderInvalidShadow)]"
                      : ""
                  }
                  ${props.className ?? ""}
                `}
              />

              {(icon_1 || icon_2) && (
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handleToggle}
                >
                  {isToggled ? icon_2 || icon_1 : icon_1}
                </div>
              )}

              <label
                className={`
                  absolute
                  right-4
                  pointer-events-none
                  transition-all
                  duration-200
                  ease-in-out
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
              <div className="mt-1 pr-4 text-right">
                <p className="text-red-500 text-xs">{meta.error}</p>
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
}
