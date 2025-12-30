import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Blog from "./blog/Blog.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Blog />
  </StrictMode>
);