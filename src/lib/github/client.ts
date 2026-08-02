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
}
