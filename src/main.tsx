  import "./assets";

  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { loadDrupalContent } from "./app/cms/drupal";
  import "./styles/index.css";

  // Inside Drupal the content comes from the CMS; otherwise the built-in content is shown
  loadDrupalContent().finally(() => createRoot(document.getElementById("root")!).render(<App />));
  