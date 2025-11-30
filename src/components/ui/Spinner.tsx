// src/components/ui/Spinner.tsx
export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-16">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};