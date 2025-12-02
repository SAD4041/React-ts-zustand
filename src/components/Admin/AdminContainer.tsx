// src/components/Admin/AdminContainer.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminContainerProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function AdminContainer({
  title,
  description,
  className,
  children,
}: AdminContainerProps) {
  return (
    <main className="flex-1 bg-second-background">
      <div className="mx-auto max-w-5xl px-8 py-8">
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

        <section
          className={cn(
            "min-h-[320px] rounded-xl border border-border bg-card p-6 shadow-lg",
            className
          )}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
