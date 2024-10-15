import { useFetchGithubRepos } from "../apis/useFetchGithubRepos";

export const GithubProjects = ({ username }: { username: string }) => {
  const { repos = [], isLoading } = useFetchGithubRepos(username);

  if (isLoading) {
    return <div>Github projects Loading...</div>;
  }

  return repos.length > 0 ? (
    <>
      <div>
        <h4 className="mb-2">Github Projects:</h4>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
        {repos.map((repo) => {
          return (
            <div
              key={repo.id}
              className="p-2 flex flex-col gap-1 border border-1 border-solid border-ui-input-primary rounded-[4px] items-start"
            >
              <div className="flex gap-2 items-center justify-between w-full">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:text-ui-text-info-primary"
                >
                  {repo.name}
                </a>

                <span className="text-ui-text-info-primary text-xs">
                  {repo.private ? "Private" : "Public"}
                </span>
              </div>
              <p className="text-xs">Language: {repo.language}</p>
              <p className="text-xs">
                Last updated: {new Date(repo.updated_at).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </>
  ) : null;
};
