// src/components/ui/Input.tsx
import { useRef, useEffect, forwardRef } from "react";
import type { InputProps, TextareaProps } from "@/types/inputTypes";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2 rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", rows = 5, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    // merge forwarded ref + internal ref
    const setRefs = (el: HTMLTextAreaElement) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    // auto-grow
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const adjust = () => {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      };

      adjust();
      el.addEventListener("input", adjust);
      return () => el.removeEventListener("input", adjust);
    }, []);

    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}

        <textarea
          ref={setRefs}
          rows={rows}
          className={`w-full px-4 py-2 rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition resize-y ${className}`}
          {...props}
        />

        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";


