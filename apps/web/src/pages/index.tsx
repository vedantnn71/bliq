import type { NextPage } from "next";
import type { ObjectId } from "bson";
import Head from "next/head";
import Image from "next/image";
import Nav from "components/nav";
import DocumentCard from "components/documentCard";
import Header from "components/header";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "utils/query";
import { useDocumentStore } from "store";
import { useEffect, useRef } from "react";
import generateKey from "lib/react/generateKey";

type Document = {
  name?: string;
  content?: string;
  _id?: ObjectId;
};

const Home: NextPage = () => {
  const { status } = useSession();
  const documents = useDocumentStore((state) => state.queriedDocuments);
  const router = useRouter();
  const elementToAnimate = useRef(null);

  useEffect(() => {
    elementToAnimate.current && autoAnimate(elementToAnimate.current);
  }, [elementToAnimate]);

  if (status === "unauthenticated") router.push("/auth/signup");

  return (
    <Flex h="100vh" direction="row">
      <Nav />
      <Flex w="100%" direction="column">
        <Header />
        <Flex h="100%" wrap="wrap" gap="8" p="8" ref={elementToAnimate}>
          <DocumentCard variant="new" />
          {documents === [] || !documents
            ? ""
            : documents.map((document: Document) => (
                <DocumentCard
                  variant="card"
                  name={document?.name}
                  content={document?.content}
                  documentId={document?._id}
                  key={generateKey(Math.floor(Math.random() * 10000))}
                />
              ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
