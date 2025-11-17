export type ToggleProps = {
  className?: string | null;
  text: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};