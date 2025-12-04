import { useRef, useEffect, forwardRef } from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";
import type { FormikTextareaProps } from "@/types/inputTypes";

export const Textarea = forwardRef<HTMLTextAreaElement, FormikTextareaProps>(
  (
    {
      label,
      autoGrow = true,
      containerClassName = "",
      inputClassName = "",
      errorClassName = "",
      className = "",
      rows = 5,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const [field, meta] = useField(props.name);
    const hasError = meta.touched && meta.error;

    // merge refs
    const setRefs = (el: HTMLTextAreaElement) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    // auto-grow
    useEffect(() => {
      if (!autoGrow) return;
      const el = innerRef.current;
      if (!el) return;

      const adjust = () => {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      };

      adjust();
      el.addEventListener("input", adjust);
      return () => el.removeEventListener("input", adjust);
    }, [autoGrow]);

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        <textarea
          {...field}
          {...props}
          ref={setRefs}
          rows={rows}
          className={cn(
            `w-full px-4 py-2 rounded-md border border-input bg-card 
             text-foreground placeholder:text-muted-foreground 
             focus:outline-none focus:ring-2 focus:ring-ring/50 
             focus:border-primary transition resize-y`,
            className,
            inputClassName
          )}
        />

        {hasError && (
          <span className={cn("text-sm text-destructive", errorClassName)}>
            {meta.error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
