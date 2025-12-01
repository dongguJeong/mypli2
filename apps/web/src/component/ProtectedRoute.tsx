import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { status, statusLoading } = useAuth();

  if (statusLoading) return <div>로딩 중</div>;

  if (!status?.loggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !status?.user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
