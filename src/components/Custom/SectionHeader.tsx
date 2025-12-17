import {ChevronLeft } from "lucide-react";


export function SectionHeader({ title, onMore, className = "" }) {
  return (
    <div
      dir="rtl"
      className={`flex items-center justify-between px-4 pt-6 ${className}`}
    >
      <h2 className="text-base font-bold text-slate-900">{title}</h2>

      {typeof onMore === "function" && (
        <button
          type="button"
          onClick={onMore}
          className="flex items-center gap-1 text-sm font-semibold text-slate-700"
        >
          <span>بیشتر</span>
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}