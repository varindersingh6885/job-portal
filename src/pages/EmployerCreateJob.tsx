import { CreateJobForm } from "../components/CreateJobForm";

export const EmployerCreateJob = () => {
  return (
    <div className="py-10 ">
      <div className="flex justify-center items-center ">
        <div className="bg-ui-background-primary px-10 py-10 rounded-xl">
          <h1 className="text-2xl mb-6">Create new job</h1>

          <CreateJobForm />
        </div>
      </div>
    </div>
  );
};
