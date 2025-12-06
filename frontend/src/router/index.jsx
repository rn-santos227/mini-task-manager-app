import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import Tasks from "@/features/tasks/pages/Tasks";
import NotFoundPage from "@/features/misc/pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path={ROUTES.REGISTER}
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path={ROUTES.TASKS}
          element={
            <ProtectedRoute>
              <AppLayout>
                <Tasks />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
