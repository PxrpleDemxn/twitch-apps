import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Theme appearance="dark">
      <App />
    </Theme>
  </BrowserRouter>
);
