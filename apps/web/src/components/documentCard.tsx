import type { MouseEvent } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { IconFile, IconPlus } from "@tabler/icons";
import { ObjectId } from "bson";
import { useRouter } from "next/router";
import parse from "html-react-parser";

interface DocumentCardProps {
  variant?: "new" | "card";
  name?: string;
  content?: string;
  documentId?: ObjectId;
}

const DocumentIcon = () => (
  <Flex px="8" py="6">
    <IconFile color="rgba(0, 0, 0, 0.8)" size="4.35rem" stroke={1} />
  </Flex>
);

const DocumentPreview = ({ content }: { content: string }) => (
  <Flex p="4" w="100%">
    <Text w="100%" textAlign="left" noOfLines={[2, 3]}>
      {parse(content)}
    </Text>
  </Flex>
);

const DocumentCard = ({
  variant = "card",
  documentId,
  name,
  content,
  ...props
}: DocumentCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (variant === "card") {
      router.push(`/document/${documentId}`);
    } else if (variant === "new") {
      router.push(`/document/new`);
    }
  };

  return (
    <Flex
      direction="column"
      border="2px"
      borderColor="gray.100"
      borderRadius="md"
      alignItems="center"
      h="250px"
      w="200px"
      transition="300ms"
      _hover={{ transform: "scale(0.98)", cursor: "pointer" }}
      onClick={handleClick}
      {...props}
    >
      <Flex
        direction="column"
        overflow="hidden"
        h={variant === "new" ? "100%" : "80%"}
        w="100%"
        justify={variant === "new" ? "center" : ""}
        alignItems={variant === "new" ? "center" : ""}
      >
        {variant === "new" ? (
          <DocumentIcon />
        ) : (
          <DocumentPreview content={content ?? ""} />
        )}
      </Flex>
      <Flex
        borderTop="2px"
        borderColor="gray.100"
        borderRadius="md"
        justify="center"
        alignItems="center"
        p="4"
        w="100%"
        h="30%"
        gap={1}
      >
        {variant === "new" && <IconPlus />}
        <Heading size="sm" color="gray.700" _hover={{ color: "gray.600" }}>
          {variant === "new" ? "New Document" : name}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default DocumentCard;
