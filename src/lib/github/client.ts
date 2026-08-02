export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  };
  description: string | null;
  private: boolean;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface GithubPullRequest {
  id: number;
  number: number;
  state: "open" | "closed";
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  head: {
    ref: string;
  };
  base: {
    ref: string;
  };
}
const GITHUB_API_URL = "https://api.github.com";

export class GitHubClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserRepositories(): Promise<GithubRepository[]> {
    // Note: for production we should paginate, but per page 100 is fine for MVP
    return this.fetchApi<GithubRepository[]>("/user/repos?sort=updated&per_page=100");
  }

  async getRepository(owner: string, repo: string): Promise<GithubRepository> {
    return this.fetchApi<GithubRepository>(`/repos/${owner}/${repo}`);
  }

  async getRepositoryPullRequests(owner: string, repo: string, limit: number = 30, state: "open" | "closed" | "all" = "all"): Promise<GithubPullRequest[]> {
    return this.fetchApi<GithubPullRequest[]>(`/repos/${owner}/${repo}/pulls?state=${state}&per_page=${limit}&sort=created&direction=desc`);
  }
}
