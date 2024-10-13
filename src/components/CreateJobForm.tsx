import { useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";

export const CreateJobForm = () => {
  const [title, setTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
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
    </>
  );
};
