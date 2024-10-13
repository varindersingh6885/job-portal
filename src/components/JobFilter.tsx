import { useMemo, useState } from "react";
import { UISelect } from "./UISelect";
import { useFetchCompanies } from "../apis/useFetchCompanies";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";
import { Button } from "./Button";
import { JobFilters } from "../types/job-filters";
import { TextInput } from "./TextInput";
import { useFetchSkills } from "../apis/useFetchSkills";
import { FieldValues, useForm } from "react-hook-form";

interface JobFilterProps {
  onApplyFilters: (filters: JobFilters) => void;
}

export const JobFilter = ({ onApplyFilters }: JobFilterProps) => {
  const { register, control } = useForm<FieldValues>({
    defaultValues: {
      experience: "",
      keyword: "",
      selectedCountriesIds: [],
      selectedStatesIds: [],
    },
  });

  const [selectedCountriesIds, setSelectedCountriesIds] = useState<number[]>(
    []
  );
  const [selectedStatesIds, setSelectedStatesIds] = useState<number[]>([]);

  // ! handle API failures
  const { companies, error: companiesFetchError } = useFetchCompanies();
  const { countries, error: countriesFetchError } = useFetchCountries();
  const { states: states, error: statesFetchError } =
    useFetchStates(selectedCountriesIds);
  const { cities, error: citiesFetchError } = useFetchCities(
    selectedCountriesIds,
    selectedStatesIds
  );

  const { skills, error: skillsFetchError } = useFetchSkills();

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

  const onApplyFiltersHandler = () => {
    onApplyFilters({
      countryIds: selectedCountriesIds,
      stateIds: selectedStatesIds,
    });
  };

  return (
    <div className="bg-ui-background-primary rounded-lg p-4 w-[300px]">
      <h4 className="mb-4">Apply job filters</h4>

      <div className="flex flex-col gap-2">
        <TextInput
          name="experience"
          type="number"
          label="Experience"
          placeholder="Enter experience in years"
          register={register}
        />

        <UISelect
          label="Skill"
          placeholder="Select skill"
          options={skillsOptions}
          isMulti
          name="skills"
          control={control}
        />

        <UISelect
          label="Company"
          placeholder="Select companies"
          options={companiesOptions}
          isMulti
          name="companies"
          control={control}
        />

        <UISelect
          label="Country"
          placeholder="Select country"
          options={countriesOptions}
          isMulti
          control={control}
          name="selectedCountriesIds"
          onChange={(value) => {
            if (Array.isArray(value)) {
              setSelectedCountriesIds(value.map((c) => c.value));
            }
          }}
        />

        <UISelect
          label="State"
          placeholder="Select state"
          options={statesOptions}
          isMulti
          control={control}
          name="selectedStatesIds"
          onChange={(value) => {
            if (Array.isArray(value)) {
              setSelectedStatesIds(value.map((c) => c.value));
            }
          }}
        />

        <UISelect
          label="City"
          placeholder="Select city"
          options={citiesOptions}
          isMulti
          control={control}
          name="selectedCitiesIds"
        />

        <TextInput
          name="Keyword"
          label="Keyword"
          placeholder="Keyword"
          register={register}
        />

        <div className="flex flex-col mt-2">
          <Button label="Apply filters" onClick={onApplyFiltersHandler} />
        </div>
      </div>
    </div>
  );
};
