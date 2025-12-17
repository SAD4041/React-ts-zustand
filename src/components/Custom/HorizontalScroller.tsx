export function HorizontalScroller({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 pt-3" dir="rtl">
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {children}
      </div>
    </div>
  );
}