import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDocumentStore } from "store";
import { ObjectId } from "bson";
import Head from "next/head";
import Image from "next/image";
import Nav from "components/nav";
import Header from "components/textDocument/header";
import TextDocument from "components/textDocument";

const Document: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { id } = router.query;
  const fetchStore = useDocumentStore(state => state.fetch);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signup");
    fetchStore(new ObjectId(id as string));
  }, [])

  return (
    <Flex h="100vh" direction="row">
      <Nav />
      <Flex minH="100%" w="100%" direction="column">
        <Header />
        <TextDocument />
      </Flex>
    </Flex>
  );
};

export default Document;
