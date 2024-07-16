import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Results from "./pages/Results";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/resultados", element: <Results /> },
]);

export default router;
