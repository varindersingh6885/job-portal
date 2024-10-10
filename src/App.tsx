import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppRoutes } from "./routes";

function App() {
  const routes = useAppRoutes();

  return (
    <div className="bg-ui-background-secondary h-screen w-screen overflow-auto">
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
}

export default App;
