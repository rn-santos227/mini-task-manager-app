import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import "./index.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Card className="not-found-card">
        <div className="not-found-content">
          <h2 className="not-found-title">Page not found</h2>
          <p className="not-found-text">
            The page you are looking for doesn&apos;t exist or may have moved. Try
            going back to your tasks or sign in to continue.
          </p>
          <div className="not-found-actions">
            <Button onClick={() => navigate(ROUTES.TASKS)}>Go to Tasks</Button>
            <Button
              variant="secondary"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
