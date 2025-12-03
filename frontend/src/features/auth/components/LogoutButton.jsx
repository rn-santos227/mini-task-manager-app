import Button from "@/components/ui/Button";
import useAuth from "../hooks/useAuth";

export default function LogoutButton({ className = "", ...props }) {
  const { isAuthenticated, logoutUser, loading } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={logoutUser}
      disabled={loading}
      className={`ml-4 ${className}`}
      {...props}
    >
      Logout
    </Button>
  );
}
