import { useState } from "react";

import { Container } from "components/Container";
import { Search } from "components/Search";
import { TheHeader } from "components/TheHeader";
import { UserCard } from "components/UserCard";

import { defaultUSer } from "mock";

import { GithubError, GithubUser, LocalGithubUser } from "types";

import { exLocalUser } from "utils/ex-local-user";
import { isGihubUser } from "utils/typeguards";

const BASE_URL = "https://api.github.com/users/";

function App() {
  const [user, setUser] = useState<LocalGithubUser | null>(defaultUSer);
  const fetchUser = async (username: string) => {
    const url = BASE_URL + username;

    const res = await fetch(url);

    const user = (await res.json()) as GithubUser | GithubError;

    if (isGihubUser(user)) {
      setUser(exLocalUser(user));
    } else {
      setUser(null);
    }
  };

  return (
    <Container>
      <TheHeader />
      <Search hasError={!user} onSubmit={fetchUser} />
      {user && <UserCard {...user} />}
    </Container>
  );
}

export default App;
