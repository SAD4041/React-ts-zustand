// src/types/admin.ts
import type { ReactNode } from "react";

export interface AdminContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export interface AdminSidebarProps {
  activeItemId?: string;
  onChangeActive?: (id: string) => void;
  className?: string;
}
