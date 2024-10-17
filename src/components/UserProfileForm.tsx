import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { FieldValues, useForm } from "react-hook-form";
import { UISelect, UISelectItem } from "./UISelect";
import { useFetchSkills } from "../apis/useFetchSkills";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";
import { TextArea } from "./TextArea";
import { FileUploader } from "./FileUploader";
import { STORAGE_BUCKETS } from "../constants.ts/storage-buckets";
import { CandidateProfile } from "../types/candidate-profile";
import { GithubProjects } from "./GithubProjects";
import { useCreateUpdateCandidateProfile } from "../apis/useCreateUpdateCandidateProfile";
import { useFetchCandidateProfile } from "../apis/useFetchCandidateProfile";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "./Loader";

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

export const UserProfileForm = () => {
  const [selectedCountriesIds, setSelectedCountriesIds] = useState<number[]>(
    []
  );
  const { user } = useUser();
  const [selectedStatesIds, setSelectedStatesIds] = useState<number[]>([]);

  const { profileData, isLoading } = useFetchCandidateProfile(user.id);
  const [githubUsername, setGithubUsername] = useState<string>("");

  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (profileData) {
      reset(profileData);
      setGithubUsername(profileData.githubUsername ?? "");
    }
  }, [profileData, reset]);

  const navigate = useNavigate();

  const { skills } = useFetchSkills();
  const { countries } = useFetchCountries();
  const { states: states } = useFetchStates(selectedCountriesIds);
  const { cities } = useFetchCities(selectedCountriesIds, selectedStatesIds);

  const { createUpdateCandidateProfile } = useCreateUpdateCandidateProfile();

  const countriesOptions = useMemo(() => {
    return countries?.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [countries]);

  const statesOptions = useMemo(() => {
    return states?.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [states]);

  const citiesOptions = useMemo(() => {
    return cities?.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [cities]);

  const skillsOptions = useMemo(() => {
    return skills?.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [skills]);

  const handleCreateJob = async (formData: FieldValues) => {
    if (createUpdateCandidateProfile) {
      const { error, status } = await createUpdateCandidateProfile(
        {
          cityId: formData.city.value,
          countryId: formData.country.value,
          stateId: formData.state.value,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          experience: formData.experience,
          githubUsername: githubUsername,
          profileDescription: formData.profileDescription,
          resumeUrl: formData.resumeUrl,
          resumeName: formData.resumeName,
          skills: formData.skills.map((s: UISelectItem) => s.value),
          phoneNumber: formData.contactNumber,
        },
        user?.id as string
      );

      if (status.toString().startsWith("2")) {
        navigate(APP_ROUTES.JOB_SEEKER_DASHBOARD);
      } else {
        console.log("error", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <TextInput
          name="firstName"
          label="First name"
          placeholder="Enter first name"
          register={register}
          isRequired
          rules={{ required: "First name is required" }}
          errorMessage={errors.firstName}
        />

        <TextInput
          name="lastName"
          label="Last name"
          placeholder="Enter last name"
          register={register}
          isRequired
          rules={{ required: "Last name is required" }}
          errorMessage={errors.lastName}
        />

        <TextInput
          name="experience"
          label="Experience"
          placeholder="Enter experience"
          register={register}
          isRequired
          rules={{
            required: "Experience is required",
            valueAsNumber: true,
          }}
          errorMessage={errors.experience}
          type="number"
        />

        <div className="col-span-full">
          <TextArea
            name="profileDescription"
            label="Profile description"
            placeholder="Enter profile description"
            register={register}
            isRequired
            rows={3}
            rules={{ required: "Profile description is required" }}
            errorMessage={errors.profileDescription}
          />
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <h2 className="col-span-full">Address details:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <UISelect
                label="Country"
                placeholder="Select country"
                options={countriesOptions}
                control={control}
                name="country"
                isRequired
                rules={{ required: "Country is required" }}
                onChange={(value: UISelectItem) => {
                  if (!Array.isArray(value) && value)
                    setSelectedCountriesIds([value.value as number]);
                }}
              />
              <p className="text-xs text-ui-text-info-primary cursor-pointer hover:underline pt-1">
                Add new country
              </p>
            </div>

            <div>
              <UISelect
                label="State"
                placeholder="Select state"
                options={statesOptions}
                control={control}
                name="state"
                isRequired
                rules={{ required: "State is required" }}
                onChange={(value: UISelectItem) => {
                  if (!Array.isArray(value) && value)
                    setSelectedStatesIds([value.value as number]);
                }}
              />
              <p className="text-xs text-ui-text-info-primary cursor-pointer hover:underline pt-1">
                Add new state
              </p>
            </div>

            <div>
              <UISelect
                label="City"
                placeholder="Select city"
                options={citiesOptions}
                control={control}
                name="city"
                isRequired
                rules={{ required: "City is required" }}
              />
              <p className="text-xs text-ui-text-info-primary cursor-pointer hover:underline pt-1">
                Add new city
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <UISelect
            label="Skills"
            placeholder="Select relevant skills"
            options={skillsOptions}
            isMulti
            name="skills"
            control={control}
          />
          <p className="text-xs text-ui-text-info-primary cursor-pointer hover:underline pt-1">
            Add new skill
          </p>
        </div>

        <TextInput
          name="contactNumber"
          label="Contact Number"
          placeholder="Enter contact number"
          register={register}
        />

        <TextInput
          name="contactEmail"
          label="Contact email"
          placeholder="Enter contact email"
          register={register}
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
            label={`📄 ${watch("resumeName") ?? "Select resume"}`}
            maxFileSizeInBytes={60000}
            bucketName={STORAGE_BUCKETS.RESUMES}
          />
        </div>

        <TextInput
          name="githubUsername"
          label="Github username"
          placeholder="Enter github username"
          register={register}
          onBlur={() => {
            setGithubUsername(getValues("githubUsername"));
          }}
        />

        <div className="col-span-full">
          <GithubProjects username={githubUsername} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button
          label="Clear"
          onClick={() => {
            reset(defaultValues);
          }}
        />
        <Button label="Post" onClick={handleSubmit(handleCreateJob)} />
      </div>
    </>
  );
};
