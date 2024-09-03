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
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        enqueueSnackbar("You need to login to access this page", {
          variant: "warning",
          preventDuplicate: true,
        });
        router.push("/login");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [enqueueSnackbar, isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
