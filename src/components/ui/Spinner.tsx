// src/components/ui/Spinner.tsx
import styles from "@/components/ui/spinner.module.css"

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className={styles.Spinner}></div>
    </div>
  );
};