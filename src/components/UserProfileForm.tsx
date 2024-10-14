import { useMemo, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { UISelect, UISelectItem } from "./UISelect";
import { useFetchSkills } from "../apis/useFetchSkills";
import { useFetchCountries } from "../apis/useFetchCountries";
import { useFetchStates } from "../apis/useFetchStates";
import { useFetchCities } from "../apis/useFetchCities";
import { TextArea } from "./TextArea";
import { FileSelector } from "./FileSelector";
import supabaseClient from "../utils/supabase";
import { useSession, useUser } from "@clerk/clerk-react";
import { CandidateProfile } from "../types/candidate-profile";
import { useFetchCandidateProfile } from "../apis/useFetchCandidateProfile";

export const UserProfileForm = () => {
  const [selectedCountriesIds, setSelectedCountriesIds] = useState<number[]>(
    []
  );
  const [selectedStatesIds, setSelectedStatesIds] = useState<number[]>([]);

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
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
      skills: [],
    },
  });

  const navigate = useNavigate();
  const { session } = useSession();
  const { user } = useUser();

  const { profileData, error, isLoading } = useFetchCandidateProfile();

  const { skills, error: skillsFetchError } = useFetchSkills();

  const { countries, error: countriesFetchError } = useFetchCountries();
  const { states: states, error: statesFetchError } =
    useFetchStates(selectedCountriesIds);
  const { cities, error: citiesFetchError } = useFetchCities(
    selectedCountriesIds,
    selectedStatesIds
  );

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

  const uploadResume = async () => {
    console.log("form data", getValues());

    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    const fileName = "resume.pdf";

    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(fileName, getValues().resume);

    console.log("data", data);
  };

  const updateProfileData = async (data: FieldValues) => {
    const updateCandidateProfilePayload: Partial<CandidateProfile> = {
      cityId: data.city.value,
      countryId: data.country.value,
      email: data.contactEmail,
      experience: parseInt(data.experience),
      firstName: data.firstName,
      githubUsername: data.githubUsername,
      lastName: data.lastName,
      profileDescription: data.profileDescription,
      skills: data.skills?.map((s: UISelectItem) => s.value),
      stateId: data.state.value,
    };

    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });

    const supabase = await supabaseClient(supabaseAccessToken as string);

    const payloadMap = {
      city_id: updateCandidateProfilePayload.cityId,
      country_id: updateCandidateProfilePayload.countryId,
      experience: updateCandidateProfilePayload.experience,
      first_name: updateCandidateProfilePayload.firstName,
      github_username: updateCandidateProfilePayload.githubUsername,
      last_name: updateCandidateProfilePayload.lastName,
      profile_description: updateCandidateProfilePayload.profileDescription,
      state_id: updateCandidateProfilePayload.stateId,
    };

    if (!profileData) {
      const { error, data: updatedProfileData } = await supabase
        .from("user_profiles")
        .insert(payloadMap);
    } else if (user) {
      const { error, data: updatedProfileData } = await supabase
        .from("user_profiles")
        .update(payloadMap)
        .eq("user_id", user.id);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(updateProfileData)}>
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
          type="number"
          rules={{ required: "Experience is required" }}
          errorMessage={errors.experience}
        />

        <TextInput
          name="githubUsername"
          label="Github username"
          placeholder="Enter github username"
          register={register}
        />

        <div className="col-span-full">
          <TextArea
            name="profileDescription"
            label="Profile description"
            placeholder="Enter description"
            register={register}
            isRequired
            rows={3}
            rules={{ required: "Profile description is required" }}
            errorMessage={errors.profileDescription}
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

        <div className="col-span-full">
          <FileSelector
            handleError={() => null}
            handleFileChange={(file) => setValue("resumeFile", file)}
            type="button"
            allowedFileFormats={["pdf"]}
          />
        </div>
      </div>
      <div className="grid mt-6">
        <Button
          label="Update Profile"
          type="submit"
          onClick={() => {
            // ! assuming login is successful
            // navigate(APP_ROUTES.EMPLOYER_DASHBOARD);
          }}
        />
      </div>
    </form>
  );
};
