import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export const AppLayout = () => {
  return (
    <div className="w-screen h-screen overflow-auto flex flex-col">
      <AppHeader />
      <div className="flex-1 overflow-auto ">
        <Outlet />
      </div>
    </div>
  );
};
