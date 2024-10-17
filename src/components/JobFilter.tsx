import { useMemo, useState } from "react";
import { UISelect, UISelectItem } from "./UISelect";
import { useFetchCompanies } from "../apis/useFetchCompanies";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";
import { Button } from "./Button";
import { JobFilters } from "../types/job-filters";
import { TextInput } from "./TextInput";
import { useFetchSkills } from "../apis/useFetchSkills";
import { FieldValues, useForm } from "react-hook-form";
import { WORK_MODE_SELECT_ITEMS } from "../constants.ts/job-filters";

interface JobFilterProps {
  onApplyFilters: (filters: JobFilters) => void;
}

const defaultValues = {
  experience: "",
  keyword: "",
  countries: [],
  states: [],
  cities: [],
  companies: [],
  skills: [],
  workMode: "",
};

export const JobFilter = ({ onApplyFilters }: JobFilterProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { register, control, getValues, reset } = useForm<FieldValues>({
    defaultValues: defaultValues,
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
    const formData = getValues();
    onApplyFilters({
      countryIds: selectedCountriesIds,
      stateIds: selectedStatesIds,
      cityIds: formData.cities.map((c: UISelectItem) => c.value),
      companyIds: formData.companies.map((c: UISelectItem) => c.value),
      experience: formData.experience,
      keyword: formData.keyword,
      title: formData.keyword,
      workMode: formData.workMode?.value,
      skillsIds: formData.skills.map((s: UISelectItem) => s.value),
    });
  };

  const clearFiltersHandler = () => {
    reset(defaultValues);
    setSelectedCountriesIds([]);
    setSelectedStatesIds([]);
    onApplyFilters({});
  };

  return (
    <div className="bg-ui-background-primary rounded-lg p-4">
      {!showAdvancedFilters && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <TextInput
              name="keyword"
              label="Job title"
              placeholder="Enter job title"
              register={register}
            />
          </div>
          <Button
            label="Search"
            type="button"
            onClick={() => onApplyFilters({ title: getValues().keyword })}
          />
          <Button label="Clear" onClick={clearFiltersHandler} />
        </div>
      )}

      {showAdvancedFilters && (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
            <TextInput
              name="keyword"
              label="Job title"
              placeholder="Enter job title"
              register={register}
            />

            <TextInput
              name="experience"
              type="number"
              label="Experience"
              placeholder="Enter experience in years"
              register={register}
              rules={{
                valueAsNumber: true,
              }}
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
              name="countries"
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
              name="states"
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
              name="cities"
            />

            <UISelect
              label="Work mode"
              placeholder="Select work mode"
              options={WORK_MODE_SELECT_ITEMS}
              name="workMode"
              control={control}
            />
          </div>
          <div className="flex mt-2 gap-3">
            <Button label="Clear filters" onClick={clearFiltersHandler} />
            <Button label="Apply filters" onClick={onApplyFiltersHandler} />
          </div>
        </>
      )}

      <button
        className="mt-2 hover:underline"
        type="button"
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
      >
        {showAdvancedFilters
          ? "Hide advanced filters"
          : "Show advanced filters"}
      </button>
    </div>
  );
};
