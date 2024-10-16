import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { FieldValues, useForm } from "react-hook-form";
import { TextArea } from "./TextArea";
import { FileUploader } from "./FileUploader";
import { STORAGE_BUCKETS } from "../constants.ts/storage-buckets";
import { CandidateProfile } from "../types/candidate-profile";
import { VALID_EMAIL_REGEX } from "../constants.ts/regex";
import { ApplicationManualPayload } from "../types/application";

const defaultValues: CandidateProfile = {
  firstName: "",
  lastName: "",
  email: "",
  profileDescription: "",
  countryId: 0,
  stateId: 0,
  cityId: 0,
  skills: [],
  experience: "",
  resumeUrl: "",
  githubUsername: "",
  phoneNumber: "",
  resumeName: "",
};

export const ManualApplicationForm = ({
  candidateId,
  jobId,
  onSubmit,
}: {
  candidateId: string;
  jobId: string;
  onSubmit: (data: ApplicationManualPayload) => void;
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: defaultValues,
  });

  const handleApplicationSubmit = async (formData: FieldValues) => {
    const payload: ApplicationManualPayload = {
      candidateId,
      expectedSalary: formData.expectedSalary,
      jobId: +jobId,
      manualApplication: true,
      resumeName: formData.resumeName,
      resumeUrl: formData.resumeUrl,
      candidateNote: formData.candidateNote,
    };

    onSubmit(payload);
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <TextInput
          name="expectedSalary"
          label="Expected salary"
          placeholder="Enter expected salary"
          register={register}
          isRequired
          rules={{
            required: "Expected salary is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Expected salary cannot be negative",
            },
          }}
          errorMessage={errors.expectedSalary}
          type="number"
        />

        <TextInput
          name="contactNumber"
          label="Contact Number"
          placeholder="Enter contact number"
          register={register}
          isRequired
          rules={{
            required: "Contact number is required",
          }}
          errorMessage={errors.contactNumber}
        />

        <TextInput
          name="contactEmail"
          label="Contact email"
          placeholder="Enter contact email"
          register={register}
          isRequired
          rules={{
            required: "Contact email is required",
            pattern: {
              value: VALID_EMAIL_REGEX,
              message: "Invalid email address",
            },
          }}
          errorMessage={errors.contactEmail}
        />

        <div className="col-span-full">
          <FileUploader
            setValue={setValue}
            control={control}
            fileNameFieldName="resumeName"
            urlFieldName="resumeUrl"
            rules={{
              required: "Resume is required",
            }}
            allowedFormats={["pdf"]}
            label={`📄 ${
              watch("resumeName")?.length
                ? watch("resumeName")
                : "Select resume"
            }`}
            maxFileSizeInBytes={60000}
            bucketName={STORAGE_BUCKETS.RESUMES}
          />
        </div>

        <div className="col-span-full">
          <TextArea
            name="candidateNote"
            label="Additional notes"
            placeholder="Enter additional notes"
            register={register}
            rows={3}
          />
        </div>
      </div>
      <div className="grid mt-4">
        <Button
          label="Submit application"
          onClick={handleSubmit(handleApplicationSubmit)}
        />
      </div>
    </>
  );
};
