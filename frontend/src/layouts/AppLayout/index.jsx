import "./index.css";
import LogoutButton from "@/features/auth/components/LogoutButton";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-title">Mini Task Manager</h1>
        <LogoutButton />
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
}
