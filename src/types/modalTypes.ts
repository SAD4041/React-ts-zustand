import { ReactNode } from "react";

export interface ModalImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
}

export interface ModalActionsProps {
  children: ReactNode;
  className?: string;
  alignment?: "left" | "center" | "right" | "between";
}

export type DialogSize = "sm" | "md" | "lg" | "xl";

export type ModalConfig = {
  isOpen: boolean;
  title?: ReactNode;
  message?: ReactNode;
  image?: string | ReactNode;
  buttonText?: ReactNode;
  onButtonClick?: () => void;
};