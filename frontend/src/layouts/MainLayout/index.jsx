import "./index.css";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <header className="main-header">
        <h1 className="main-title">Mini Task Manager</h1>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
