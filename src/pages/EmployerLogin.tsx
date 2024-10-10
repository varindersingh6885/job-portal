import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../shared/constants";

export const EmployerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-ui-background-primary px-10 py-10 rounded-xl">
        <h1 className="text-2xl">Log in</h1>

        <div className="flex flex-col gap-2 mt-4">
          <TextInput
            name="username"
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button
            label="Log in"
            onClick={() => {
              // ! assuming login is successful
              navigate(APP_ROUTES.EMPLOYER_DASHBOARD);
            }}
          />
        </div>
      </div>
    </div>
  );
};
