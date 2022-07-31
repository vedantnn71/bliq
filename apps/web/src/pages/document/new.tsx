import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import axios from "axios";

const createDocument = async () => {
  const response = await axios.post("/api/document/new");
  const data = response?.data;

  return data;
};

const New: NextPage = () => {
  const { data, isLoading } = useQuery(["/api/document/new"], createDocument);
  const router = useRouter();

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }

  if (!data?.insertedId || !data?.acknowledged) {
    router.push("/");
  } else {
    router.push(`/document/${data?.insertedId}`);
  }

  return <Text>Redirecting ...</Text>;
};

export default New;
