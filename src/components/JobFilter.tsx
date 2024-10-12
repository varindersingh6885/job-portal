import { useMemo, useState } from "react";
import { UISelect } from "./UISelect";
import { useFetchCompanies } from "../apis/useFetchCompanies";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";

export const JobFilter = () => {
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

  return (
    <div className="bg-ui-background-primary rounded-lg p-4 w-[300px]">
      <h4 className="mb-4">Apply job filters</h4>

      <div className="flex flex-col gap-2">
        <UISelect
          label="Country"
          placeholder="Select country"
          options={countriesOptions}
          isMulti
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
          onChange={(value) => console.log("selected cities", value)}
        />

        <UISelect
          label="Company"
          placeholder="Select companies"
          options={companiesOptions}
          isMulti
          onChange={(value) => console.log("selected values", value)}
        />
      </div>
    </div>
  );
};
