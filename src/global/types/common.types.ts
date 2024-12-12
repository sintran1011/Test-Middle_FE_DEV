export interface IUser {
  avatar_url: string;
  followers: number;
  name: string;
  public_repos: number;
  user_view_type: string;
  html_url: string;
}

export interface IRepo {
  full_name: string;
  homepage?: string;
  html_url?: string;
  id: number;
  language: string;
  visibility?: string;
}
