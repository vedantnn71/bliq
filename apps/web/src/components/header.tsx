import type { ChangeEvent } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons";
import { getDocuments } from "utils/query";
import { useDocumentStore } from "store";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Search = () => {
  const [query, setQuery] = useState("");
  const { data: documents, isLoading } = useQuery(
    ["/api/document"],
    getDocuments,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const queriedDocuments = useDocumentStore((state) => state.queriedDocuments);
  const setQueriedDocuments = useDocumentStore(
    (state) => state.setQueriedDocuments
  );

  useEffect(() => {
    if (query === "") {
      setQueriedDocuments(documents?.data);
      return;
    }

    const found = queriedDocuments?.filter((doc) =>
      doc?.name?.toLowerCase().includes(query.toLowerCase())
    );

    if (JSON.stringify(queriedDocuments) === JSON.stringify(found)) return;

    setQueriedDocuments(found);
  }, [documents, query]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target?.value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <IconSearch color="gray" />
      </InputLeftElement>
      <Input
        placeholder="Search your docs..."
        value={query}
        onChange={handleSearch}
        border="2px"
        borderColor="gray.100"
        borderRadius="lg"
        py="3"
        maxW={250}
        h="100%"
      />
    </InputGroup>
  );
};

const Header = () => {
  return (
    <Flex h="max-content" w="100%" p="6" boxShadow="base">
      <Search />
    </Flex>
  );
};
export default Header;
