import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App.jsx";
import { AuthProvider } from "./components/context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Theme appearance="dark">
      <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  </BrowserRouter>,
);
