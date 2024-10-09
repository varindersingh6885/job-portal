import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppRoutes } from "./routes";

function App() {
  const routes = useAppRoutes();

  return (
    <div>
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
}

export default App;
