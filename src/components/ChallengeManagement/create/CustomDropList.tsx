import { Field, type FieldProps } from "formik";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { create } from "zustand";

type CustomSelectProps = {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
  onIconClick?: () => void;
  width?: string;
};

/* -------------------------------------------------------------------------- */
/*  Close other dropdowns when one opens                                      */
/* -------------------------------------------------------------------------- */
const useDropdownStore = create<{ openName: string | null; setOpen: (name: string | null) => void }>(
  (set) => ({
    openName: null,
    setOpen: (name) => set({ openName: name }),
  })
);

export default function CustomSelect({
  label = "نوع چالش",
  name,
  options,
  icon = <ChevronDown className="w-5 h-5" />,
  onIconClick,
  width = "",
}: CustomSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isRTL, setIsRTL] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openName, setOpen } = useDropdownStore();

  const detectRTL = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const hasValue = field.value?.length > 0;
        const isFloating = isFocused || hasValue;
        const hasError = meta.touched && meta.error;
        const selectedLabel = options.find((o) => o.value === field.value)?.label || "";

        /* -------------------------- Detect RTL -------------------------- */
        useEffect(() => {
          if (field.value) setIsRTL(detectRTL(field.value));
        }, [field.value]);

        /* ----------------------- Click-outside close --------------------- */
        useEffect(() => {
          const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
              setIsOpen(false);
              setOpen(null);
            }
          };
          if (isOpen) document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [isOpen, setOpen]);

        const toggleOpen = () => {
          const newOpen = !isOpen;
          setIsOpen(newOpen);
          setOpen(newOpen ? name : null);
          setIsFocused(newOpen);
        };

        const selectOption = (value: string) => {
          field.onChange({ target: { name, value } });
          setIsOpen(false);
          setOpen(null);
          setIsFocused(false);
        };

        return (
          <div className={`flex flex-col ${width}`} ref={dropdownRef}>
            <div className="relative">

              {/* ────────────────────── CLICKABLE TRIGGER ────────────────────── */}
              <div
                onClick={toggleOpen}
                className={`
                  border !border-[var(--borderDefault)]
                  shadow-[0px_1px_0px_var(--borderDefault)]
                  focus:!border-[var(--borderFoucus)]
                  focus:!shadow-[0px_1px_0px_var(--borderFoucusShadow)]
                  focus:!ring-0 focus-visible:!ring-0
                  p-2 rounded-[8px] w-full h-10
                  bg-white cursor-pointer
                  transition-all duration-200 ease-in-out
                  relative flex items-center
                  ${hasError
                    ? "!border-[var(--borderInvalid)] shadow-[0px_1px_0px_var(--borderInvalidShadow)]"
                    : ""}
                  ${isOpen || isFocused
                    ? "!border-[var(--borderFoucus)] !shadow-[0px_1px_0px_var(--borderFoucusShadow)]"
                    : ""}
                `}
              >
                {/* TEXT – flush to the right, space for icon on left */}
                <span
                  className={`
                    block truncate
                    absolute right-4 left-12 top-1/2 -translate-y-1/2
                    text-right
                    ${!hasValue ? "text-gray-500" : "text-black"}
                  `}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  {hasValue ? selectedLabel : label}
                </span>

                {/* ICON – left side in RTL, right side in LTR */}
                {icon && (
                  <div
                    className={`
                      absolute top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none
                      transition-transform duration-200
                      ${isRTL ? "left-4" : "right-4"}
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  >
                    {icon}
                  </div>
                )}
              </div>

              {/* ────────────────────── FLOATING LABEL ────────────────────── */}
              <label
                className={`
                  absolute pointer-events-none transition-all duration-200 ease-in-out font-bold
                  right-4
                  ${isFloating
                    ? "top-[-10px] text-xs bg-white px-1 text-black"
                    : "top-1/2 -translate-y-1/2 text-sm text-gray-500"}
                `}
              >
                {label}
              </label>

              {/* ────────────────────── DROPDOWN MENU ────────────────────── */}
              {isOpen && openName === name && (
                <div
                  className={`
                    absolute top-full mt-1 w-full
                    border !border-[var(--borderDefault)]
                    shadow-[0px_1px_0px_var(--borderDefault)]
                    bg-white rounded-[8px]
                    overflow-hidden z-50
                    animate-in fade-in slide-in-from-top-1 duration-200
                  `}
                  style={{
                    boxShadow:
                      "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 1px 0px var(--borderDefault)",
                  }}
                >
                  {options.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => selectOption(opt.value)}
                      className={`
                        px-4 py-2 text-right cursor-pointer transition-colors
                        hover:bg-gray-50
                        ${field.value === opt.value ? "bg-gray-100 font-medium" : ""}
                      `}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ────────────────────── ERROR MESSAGE ────────────────────── */}
            {hasError && (
              <div className="mt-1 text-xs pr-4 text-right">
                <p className="text-red-500">{meta.error}</p>
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
}