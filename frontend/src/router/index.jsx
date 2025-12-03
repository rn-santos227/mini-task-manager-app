import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <AuthLayout>
              <div>Login Page</div>
            </AuthLayout>
          }
        />

        <Route
          path={ROUTES.REGISTER}
          element={
            <AuthLayout>
              <div>Register Page</div>
            </AuthLayout>
          }
        />

        <Route
          path={ROUTES.TASKS}
          element={
            <MainLayout>
              <div>Task List</div>
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.TASK_CREATE}
          element={
            <MainLayout>
              <div>Create Task</div>
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.TASK_EDIT(":id")}
          element={
            <MainLayout>
              <div>Edit Task</div>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
