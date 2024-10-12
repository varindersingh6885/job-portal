import { useMemo } from "react";
import { UISelect } from "./UISelect";
import { useFetchCompanies } from "../apis/useFetchCompanies";

export const JobFilter = () => {
  // ! handle API failures
  const { companies, error } = useFetchCompanies();

  const companiesOptions = useMemo(() => {
    return companies?.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [companies]);

  return (
    <div className="bg-ui-background-primary rounded-lg p-4 w-[300px]">
      <h4 className="mb-4">Apply job filters</h4>

      <div className="flex flex-col gap-4">
        <UISelect
          label="Companies"
          placeholder="Select companies"
          options={companiesOptions}
          isMulti
          onChange={(value) => console.log("selected values", value)}
        />
      </div>
    </div>
  );
};
