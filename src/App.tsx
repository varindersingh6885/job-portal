import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppRoutes } from "./routes";

function App() {
  const routes = useAppRoutes();

  return (
    <div className="bg-ui-background-secondary">
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
}

export default App;
