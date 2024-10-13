import { useMemo, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants.ts/app-routes";
import { FieldValues, useForm } from "react-hook-form";
import { UISelect } from "./UISelect";
import { useFetchSkills } from "../apis/useFetchSkills";
import { useFetchCompanies } from "../apis/useFetchCompanies";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";

export const CreateJobForm = () => {
  const [selectedCountriesIds, setSelectedCountriesIds] = useState<number[]>(
    []
  );
  const [selectedStatesIds, setSelectedStatesIds] = useState<number[]>([]);

  const { register, control } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      experience: "",
      company: "",
      country: "",
      state: "",
      city: "",
      employerName: "",
      contactNumber: "",
      contactEmail: "",
    },
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

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <TextInput
          name="title"
          label="Job title"
          placeholder="Enter job title"
          register={register}
          isRequired
        />

        <TextInput
          name="experience"
          label="Experience"
          placeholder="Enter experience"
          register={register}
          isRequired
        />

        <TextInput
          name="description"
          label="Description"
          placeholder="Enter Description"
          register={register}
          isRequired
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

        <div>
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

        <div>
          <UISelect
            label="Country"
            placeholder="Select country"
            options={countriesOptions}
            control={control}
            name="country"
            isRequired
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
          />
          <p className="text-xs text-ui-text-info-primary cursor-pointer hover:underline pt-1">
            Add new city
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
