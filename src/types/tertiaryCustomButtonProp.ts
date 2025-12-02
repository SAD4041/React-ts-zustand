export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  backgroundColor?: string;
  pageAddress?: string;
  width?: string;
  onClick?: () => void;
  className?: string;
  isGray?: boolean;
}