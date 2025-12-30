// src/components/Admin/AdminContainer.tsx
import { cn } from "@/lib/utils";
import type { AdminContainerProps } from "@/types/admin";

export function AdminContainer({
  title,
  description,
  children,
  className,
}: AdminContainerProps) {
  return (
    <section className="flex-1 px-8 py-6" dir="rtl">
      {title && (
        <header className="mb-4">
          <h1 className="text-section font-extrabold text-charcoal-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-small text-charcoal-500">
              {description}
            </p>
          )}
        </header>
      )}

      <div
        className={cn(
          "mt-6 rounded-xl border border-border bg-card shadow-lg px-6 py-5",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
