// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import useUserStore from '@/store/userStore/userStore';
import type { ProtectedRouteProps } from '@/types/protectedRoute';


const normalizeRole = (role?: string | null) => {
  if (!role) return undefined;
  if (role === "M" || role === "brand") return "M";
  if (role === "C" || role === "user") return "C";
  return role;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const userRole = useUserStore((state) => state.user?.role); // ✅ استفاده از role از user

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const normalizedUserRole = normalizeRole(userRole);
    const normalizedAllowed = allowedRoles.map((role) => normalizeRole(role));
    if (!normalizedUserRole || !normalizedAllowed.includes(normalizedUserRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
