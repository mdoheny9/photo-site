import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Upload from "./routes/upload";
import ConfirmUpload from "./routes/confirmUpload";

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
    element: <ConfirmUpload />,
  }
])

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
);