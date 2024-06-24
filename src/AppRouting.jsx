import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ShouldNotBeLogged from "./middlewares/ShouldNotBeLogged";
import ShouldBeLogged from "./middlewares/ShouldBeLogged";
import Loader from "./components/shared/Loader";
import Login from "./pages/Login";
import ResetPassword from "pages/ResetPassword";
import VerificationCodeForm from "pages/VerificationCodeForm";
import PasswordEditForm from "pages/PasswordEditForm";

import loadable from "@loadable/component";

const DashboardRouting = loadable(() =>
  import("./modules/dashboard/DashboardRouting")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AppRouting = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ShouldNotBeLogged>
            <Login />
          </ShouldNotBeLogged>
        }
      />

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/reset-password/check-code/:email"
        element={<VerificationCodeForm />}
      />
      <Route
        path="/reset-password/edit-password/:email/:code"
        element={<PasswordEditForm />}
      />
      <Route path="/" element={<Navigate to="/reset-password" />} />
      <Route
        path="Dashboard/*"
        element={
          <ShouldBeLogged>
            <React.Suspense fallback={<Loader />}>
              <QueryClientProvider client={queryClient}>
                <DashboardRouting />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </React.Suspense>
          </ShouldBeLogged>
        }
      />
    </Routes>
  );
};

export default AppRouting;
