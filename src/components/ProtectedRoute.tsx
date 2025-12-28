// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import useUserStore from '@/store/userStore/userStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireBrand?: boolean; // آیا فقط brand ها دسترسی دارن؟
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireBrand = false 
}) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isBrand = useUserStore((state) => state.isBrand);

  if (!isAuthenticated) {
    // اگر لاگین نیست، به صفحه لاگین بفرستش
    return <Navigate to="/login" replace />;
  }

  if (requireBrand && !isBrand()) {
    // اگر نیاز به برند بودن داره ولی برند نیست
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;