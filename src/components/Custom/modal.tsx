import React from "react";
import { cn } from "@/lib/utils";
import type { 
  ModalImageProps, 
  ModalButtonProps, 
  ModalActionsProps 
} from "@/types/modalTypes";

export const ModalImage: React.FC<ModalImageProps> = ({ 
  src, 
  alt = "modal-image", 
  className 
}) => {
  return (
    <div className="flex justify-center mb-4">
      <img 
        src={src} 
        alt={alt} 
        className={cn("w-28 h-auto", className)} 
      />
    </div>
  );
};

export const ModalButton: React.FC<ModalButtonProps> = ({ 
  children,
  onClick,
  variant = "default",
  className,
  disabled = false
}) => {
  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    ghost: "hover:bg-gray-100 text-gray-900",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export const ModalActions: React.FC<ModalActionsProps> = ({ 
  children, 
  className,
  alignment = "center"
}) => {
  const alignmentStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div className={cn(
      "mt-4 flex gap-2",
      alignmentStyles[alignment],
      className
    )}>
      {children}
    </div>
  );
};