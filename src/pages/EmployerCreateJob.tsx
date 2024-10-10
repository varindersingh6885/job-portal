import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { APP_ROUTES } from "../shared/constants";

export const EmployerCreateJob = () => {
  const [title, setTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-auto py-10">
      <div className="flex justify-center items-center ">
        <div className="bg-ui-background-primary px-10 py-10 rounded-xl">
          <h1 className="text-2xl mb-6">Create new job</h1>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <TextInput
              name="title"
              label="Job title"
              placeholder="Enter job title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextInput
              name="address"
              label="Job location"
              placeholder="Enter job location"
              onChange={(e) => setJobLocation(e.target.value)}
              value={jobLocation}
            />

            <TextInput
              name="employerName"
              label="Employer Name"
              placeholder="Enter employer name"
              onChange={(e) => setEmployerName(e.target.value)}
              value={employerName}
            />

            <TextInput
              name="contactNumber"
              label="Contact Number"
              placeholder="Enter contact number"
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
            />

            <TextInput
              name="contactEmail"
              label="Contact email"
              placeholder="Enter contact email"
              onChange={(e) => setContactEmail(e.target.value)}
              value={contactEmail}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              label="Clear"
              onClick={() => {
                // ! assuming login is successful
                navigate(APP_ROUTES.EMPLOYER_DASHBOARD);
              }}
            />
            <Button
              label="Post"
              onClick={() => {
                // ! assuming login is successful
                navigate(APP_ROUTES.EMPLOYER_DASHBOARD);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
