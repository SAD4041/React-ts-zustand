// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import useUserStore from '@/store/userStore/userStore';
import type { ProtectedRouteProps } from '@/types/protectedRoute';


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
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;