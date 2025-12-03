import "./index.css";
import { Link } from "react-router-dom";
import { Card, TextField, Button } from "@/components/ui";
import useAuth from "../../hooks/useAuth";
import useAuthForm from "../../hooks/useAuthForm";
import { ROUTES } from "@/constants/routes";

export default function Login() {
  const { login, loading, error } = useAuth();
  const { form, errors, handleSubmit, setField, dirty } = useAuthForm({
    email: "",
    password: "",
  });

  const onSubmit = async (values) => {
    await login(values);
  };

  return (
    <div className="auth-page">
      <Card
        className="auth-card"
        title="Welcome back"
        footer={
          <div className="auth-footer">
            Don't have an account? {" "}
            <Link className="auth-link" to={ROUTES.REGISTER}>
              Register
            </Link>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            error={dirty ? errors.email : ""}
            required
          />

          <TextField
            label="Password"
            type="password"
            placeholder="••••••"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            error={dirty ? errors.password : ""}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
