import { Textarea } from "@/components/ui/textarea";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { Field, type FieldProps } from "formik";

type CustomTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  width?: string;
  maxLength?: number;
  maxLines?: number;
};

export default function CustomTextArea({
  label = "متن",
  name,
  icon = null,
  onIconClick,
  width = "",
  maxLength = 200,
  maxLines = 10,
  ...props
}: CustomTextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isRTL, setIsRTL] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const detectRTL = (text: string) => /[\u0600-\u06FF]/.test(text);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const hasValue = field.value?.length > 0;
        const isFloating = isFocused || hasValue;
        const hasError = meta.touched && meta.error;
        const remaining = maxLength - (field.value?.length || 0);

        useEffect(() => {
          if (field.value !== undefined && field.value !== null) {
            setIsRTL(detectRTL(field.value));
            autoResize();
          }
        }, [field.value]);

        const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(true);
          props.onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(false);
          field.onBlur(e);
          props.onBlur?.(e);
        };

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const value = e.target.value;

          // محدود کردن طول متن
          if (value.length > maxLength) return;

          // شمارش خطوط (Enter ها)
          const lines = value.split("\n").length;
          if (lines > maxLines) return;

          field.onChange(e);
          autoResize();
        };

        return (
          <div className={"flex flex-col " + width}>
            <div className="relative">
              <Textarea
                ref={textareaRef}
                {...field}
                {...props}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                dir={"rtl" }
                className={`
                  border !border-[var(--borderDefault)]
                  shadow-[0px_1px_0px_var(--borderDefault)]
                  focus:!border-[var(--borderFoucus)]
                  focus:!shadow-[0px_1px_0px_var(--borderFoucusShadow)]
                  focus:!ring-0 focus-visible:!ring-0
                  rounded-xl w-full resize-none overflow-hidden
                  p-3
                  ${"text-right pr-4"}
                  ${icon ? (isRTL ? "pl-12" : "pr-12") : ""}
                  transition-all duration-200 ease-in-out
                  ${
                    hasError
                      ? "!border-[var(--borderInvalid)] shadow-[0px_1px_0px_var(--borderInvalidShadow)]"
                      : ""
                  }
                  ${props.className ?? ""}
                `}
                style={{ minHeight: "120px" }}
              />

              {icon && (
                <div
                  className={`
                    absolute top-4 text-gray-500 cursor-pointer
                    ${isRTL ? "left-4" : "right-4"}
                  `}
                  onClick={onIconClick}
                >
                  {icon}
                </div>
              )}

              <label
                className={`
                  absolute pointer-events-none transition-all duration-200 ease-in-out font-bold
                  ${ "right-4" }
                  ${
                    isFloating
                      ? "top-[-10px] text-xs bg-white px-1 text-black"
                      : "top-3 text-sm text-gray-500"
                  }
                `}
              >
                {label}
              </label>
            </div>

            {/* پیام خطا */}
            {hasError && (
              <div
                className={`mt-1 text-xs ${
                  isRTL ? "pr-4 text-right" : "pl-4 text-left"
                }`}
              >
                <p className="text-red-500">{meta.error}</p>
              </div>
            )}

            {/* شمارنده کاراکتر باقی مانده */}
            <div
              className={`mt-1 text-xs text-gray-400 ${
                "pr-4 text-right"
              }`}
            >
              {remaining} کاراکتر باقی مانده
            </div>
          </div>
        );
      }}
    </Field>
  );
}
