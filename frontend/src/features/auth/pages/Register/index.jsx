import "./index.css";
import { Link } from "react-router-dom";
import { Card, TextField, Button } from "@/components/ui";
import useAuth from "../../hooks/useAuth";
import useAuthForm from "../../hooks/useAuthForm";
import { ROUTES } from "@/constants/routes";

export default function Register() {
  const { register, loading, error } = useAuth();
  const { form, errors, handleSubmit, setField, dirty } = useAuthForm({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (values) => {
    await register(values);
  };

  return (
    <div className="auth-page">
      <Card
        className="auth-card"
        title="Create an account"
        footer={
          <div className="auth-footer">
            Already have an account? {" "}
            <Link className="auth-link" to={ROUTES.LOGIN}>
              Login
            </Link>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            error={dirty ? errors.name : ""}
            required
          />

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
            placeholder="Create a strong password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            error={dirty ? errors.password : ""}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
