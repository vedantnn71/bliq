import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Container from "components/layout/container";
import Auth from "components/auth";
import isAuthenticated from "utils/isAuthenticated";

const Home: NextPage = () => {
  const [authenticated, setAuthenticated] = useState<any>();

  useEffect(() => {
    isAuthenticated()
      .then((response) => setAuthenticated(response))
      .catch((error) => console.error);
  }, []);

  if (!authenticated)
    return (
      <Container>
        <Auth />
      </Container>
    );

  return (
    <Container>
      <h1>Hola world!</h1>
    </Container>
  );
};

export default Home;
