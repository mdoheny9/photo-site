import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Upload from "./routes/upload";
import ConfirmUpload from "./routes/confirmUpload";
import Checkout from "./checkout/Checkout";
import SignUp from "./routes/sign-up";
import SignIn from "./routes/sign-in";

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
    path: "/upload/confirm",
    element: <Checkout />,
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
    <RouterProvider router = {router} />
  </StrictMode>
);