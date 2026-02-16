import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import AuthProvider, { useAuth } from "./components/AuthProvider";

import Root from "./routes/root";
import Upload from "./routes/upload";
import SignUp from "./routes/sign-up";
import SignIn from "./routes/sign-in"
import Profile from "./routes/profile";


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <ProtectedRoute><Root /></ProtectedRoute>,
  },
  {
    path: "/upload",
    element: <ProtectedRoute><Upload /></ProtectedRoute>,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: "/view/:username",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  }
])

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router = {router} />
    </AuthProvider>
  </StrictMode>
);