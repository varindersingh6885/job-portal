import { useParams } from "react-router-dom";
import { useFetchCandidateProfile } from "../apis/useFetchCandidateProfile";
import { ResultsNotFound } from "../components/ResultsNotFound";
import { Loader } from "../components/Loader";
import { GithubProjects } from "../components/GithubProjects";

export const ViewCandidateProfile = () => {
  const { candidateId } = useParams();

  const { profileData, isLoading } = useFetchCandidateProfile(candidateId);

  if (!isLoading && !profileData)
    return <ResultsNotFound message="Candidate not found" />;

  return (
    <div className="py-10">
      <div className="bg-ui-background-primary px-10 py-10 rounded-xl w-[80%] m-auto">
        <h2 className="text-2xl text-center mb-4">Candidate profile</h2>

        <div className=" border-ui-border-primary pb-2">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p>First name: {profileData?.firstName}</p>
              <p>Last name: {profileData?.lastName} </p>
              {profileData?.email && <p>Email: {profileData.email}</p>}
              <p>Phone: {profileData?.phoneNumber}</p>
              <p>Country: {profileData?.country.label}</p>
              <p>State: {profileData?.state.label}</p>
              <p>City: {profileData?.city.label}</p>

              <p>Experience: {profileData.experience} years</p>

              <div className="flex gap-2 flex-wrap">
                <p>Skills: </p>
                <div className="flex gap-2">
                  {profileData.skills.map((skill) => (
                    <p
                      key={skill.value}
                      className="border border-1 border-solid border-ui-border-primary rounded-[4px] px-2 bg-ui-button-secondary"
                    >
                      {skill.label}
                    </p>
                  ))}
                </div>
              </div>

              <a
                href={profileData.resumeUrl}
                download={profileData.resumeName}
                className="text-ui-link-primary underline"
                target="_blank"
                rel="noreferrer"
              >
                Download resume
              </a>

              {profileData.githubUsername ? (
                <>
                  <p>Github username: {profileData.githubUsername}</p>
                  <GithubProjects username={profileData.githubUsername} />
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
