import { useMemo, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { FieldValues, useForm } from "react-hook-form";
import { UISelect, UISelectItem } from "./UISelect";
import { useFetchSkills } from "../apis/useFetchSkills";
import { useFetchCompanies } from "../apis/useFetchCompanies";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";
import { TextArea } from "./TextArea";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";
import { FileUploader } from "./FileUploader";
import { STORAGE_BUCKETS } from "../constants.ts/storage-buckets";
import { useCreateJob } from "../apis/useCreateJob";

const defaultValues = {
  title: "",
  description: "",
  cityId: "",
  stateId: "",
  countryId: "",
  maxExperience: "",
  minExperience: "",
  minSalary: "",
  maxSalary: "",
  skills: [], // ! need implement this feature
  companyId: "",
  workMode: "",
  salary: "",
  contactEmail: "",
  contactNumber: "",
};

export const CreateJobForm = () => {
  const [selectedCountriesIds, setSelectedCountriesIds] = useState<number[]>(
    []
  );
  const [selectedStatesIds, setSelectedStatesIds] = useState<number[]>([]);

  const {
    register,
    control,
    formState: { errors },
    setValue,

    reset,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();

  const { skills, error: skillsFetchError } = useFetchSkills();
  const { companies, error: companiesFetchError } = useFetchCompanies();
  const { countries, error: countriesFetchError } = useFetchCountries();
  const { states: states, error: statesFetchError } =
    useFetchStates(selectedCountriesIds);
  const { cities, error: citiesFetchError } = useFetchCities(
    selectedCountriesIds,
    selectedStatesIds
  );

  const { createJob } = useCreateJob();

  const companiesOptions = useMemo(() => {
    return companies?.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [companies]);

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
    console.log("formData", formData);
    if (createJob) {
      const { error, status } = await createJob({
        title: formData.title,
        minExperience: formData.minExperience,
        maxExperience: formData.maxExperience,
        minSalary: formData.minSalary,
        maxSalary: formData.maxSalary,
        companyId: formData.company.value,
        workMode: formData.workMode.value,
        description: formData.jobRequirements,
        countryId: formData.country.value,
        stateId: formData.state.value,
        cityId: formData.city.value,
        contactEmail: formData.contactEmail,
        contactNumber: formData.contactNumber,
        descriptionDocumentUrl: formData.descriptionDocumentUrl,
        descriptionDocumentFileName: formData.jobDescriptionDocumentFileName,
        skills: formData.skills.map((s: UISelectItem) => s.value),
      });

      if (status === 201) {
        navigate(APP_ROUTES.EMPLOYER_DASHBOARD);
      } else {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <TextInput
          name="title"
          label="Job title"
          placeholder="Enter job title"
          register={register}
          isRequired
          rules={{ required: "Job title is required" }}
          errorMessage={errors.title}
        />

        <TextInput
          name="minExperience"
          label="Minimum experience"
          placeholder="Enter minimum experience"
          register={register}
          isRequired
          rules={{
            required: "Minimum experience is required",
            valueAsNumber: true,
          }}
          errorMessage={errors.minExperience}
          type="number"
        />

        <TextInput
          name="maxExperience"
          label="Maximum experience"
          placeholder="Enter maximum experience"
          register={register}
          isRequired
          rules={{
            required: "Maximum experience is required",
            valueAsNumber: true,
          }}
          errorMessage={errors.maxExperience}
        />

        <TextInput
          name="minSalary"
          label="Minimum salary (per hour)"
          placeholder="Enter minimum salary"
          register={register}
          isRequired
          rules={{
            required: "Minimum salary is required",
            valueAsNumber: true,
          }}
          errorMessage={errors.minSalary}
        />

        <TextInput
          name="maxSalary"
          label="Maximum salary (per hour)"
          placeholder="Enter maximum salary"
          register={register}
          isRequired
          rules={{
            required: "Maximum salary is required",
            valueAsNumber: true,
          }}
          errorMessage={errors.maxSalary}
        />

        <div>
          <UISelect
            label="Company"
            placeholder="Select company"
            options={companiesOptions}
            name="company"
            control={control}
            isRequired
          />
          <p className="text-xs text-ui-text-info-primary cursor-pointer hover:underline pt-1">
            Add new company
          </p>
        </div>

        <UISelect
          label="Work mode"
          placeholder="Select work mode"
          options={WORK_MODE_SELECT_ITEMS}
          name="workMode"
          control={control}
          isRequired
          rules={{ required: "Work mode is required" }}
        />

        <div className="col-span-full">
          <TextArea
            name="jobRequirements"
            label="Job requirements"
            placeholder="Enter job requirements"
            register={register}
            isRequired
            rows={3}
            rules={{ required: "Job requirements is required" }}
            errorMessage={errors.jobRequirements}
          />
        </div>

        <div className="col-span-full grid grid-cols-3 gap-4">
          <div>
            <UISelect
              label="Country"
              placeholder="Select country"
              options={countriesOptions}
              control={control}
              name="country"
              isRequired
              rules={{ required: "Country is required" }}
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
            fileNameFieldName="jobDescriptionDocumentFileName"
            urlFieldName="descriptionDocumentUrl"
            rules={{
              required: "Job description document is required",
            }}
            allowedFormats={["pdf"]}
            label="📄 Select job description document"
            maxFileSizeInBytes={16000}
            bucketName={STORAGE_BUCKETS.JOB_DESCRIPTION_DOCUMENTS}
          />
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
