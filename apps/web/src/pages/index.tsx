import type { NextPage } from "next";
import type { ObjectId } from "bson";
import Head from "next/head";
import Image from "next/image";
import Nav from "components/nav";
import DocumentCard from "components/documentCard";
import axios from "axios";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import generateKey from "lib/react/generateKey";

const getDocuments = async () => {
  const response = await axios.get("/api/document");
  return response.data;  
}

type Document = {
  name?: string;
  content?: string;
  _id?: ObjectId;
}

const Home: NextPage = () => {
  const { status } = useSession();
  const { data, isLoading } = useQuery(["/api/document"], getDocuments);
  const router = useRouter();

  if (status === "unauthenticated") router.push("/auth/signup");

  if (isLoading) return <h1>loading...</h1>;

  return (
    <Flex h="100vh" direction="row">
      <Nav />
      <Flex direction="row" wrap="wrap" gap="8" p="8">
        <DocumentCard variant="new" />
        {data.map((document: Document) => (
          <DocumentCard
            variant="card"
            name={document?.name}
            content={document?.content}
            documentId={document?._id}
            key={generateKey(Math.floor(Math.random()*10000))}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
