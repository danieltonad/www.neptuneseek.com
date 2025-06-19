import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <SearchProvider>
        <App />
      </SearchProvider>
    </StrictMode>
  );
}
