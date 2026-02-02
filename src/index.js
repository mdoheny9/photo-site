import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Upload from "./routes/upload";
import SignUp from "./routes/sign-up";
import SignIn from "./routes/sign-in"

import AuthProvider from "./components/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
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