import { GithubUser } from "types";

export const isGihubUser = (user: any): user is GithubUser => 'id' in user