import { useEffect, useState } from "react";
import { GithubRepo } from "../types/github";

export const useFetchGithubRepos = (githubUsername: string) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepos = async (githubUsername: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?per_page=10`
      );
      const data = await response.json();
      if (response.status === 200) {
        setRepos(data);
      } else {
        setRepos([]);
      }
    } catch (error) {
      console.log("git error", error);
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (githubUsername) fetchRepos(githubUsername);
    else {
      setRepos([]);
    }
  }, [githubUsername]);

  return { repos, isLoading };
};
