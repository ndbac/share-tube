import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [enqueueSnackbar, isAuthenticated, router]);

  if (!isAuthenticated) {
    enqueueSnackbar("You need to login to access this page", { variant: "warning", preventDuplicate: true });
    return <div />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
