import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { FieldValues, useForm } from "react-hook-form";

export const EmployerLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onLogin = (formData: FieldValues) => {
    console.log(formData);

    // ! validate and proceed
    navigate(APP_ROUTES.EMPLOYER_DASHBOARD);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-ui-background-primary px-10 py-10 rounded-xl">
        <h1 className="text-2xl">Log in</h1>

        <form
          className="flex flex-col gap-2 mt-4"
          onSubmit={handleSubmit(onLogin)}
        >
          <TextInput
            name="username"
            label="Username"
            placeholder="Enter your username"
            register={register}
            rules={{
              required: "Username is required",
            }}
            errorMessage={errors.username}
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            register={register}
            rules={{
              required: "Password is required",
            }}
            errorMessage={errors.password}
          />

          <Button type="submit" label="Log in" />
        </form>
      </div>
    </div>
  );
};
