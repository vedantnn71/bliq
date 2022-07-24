import { Box } from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";

interface BackgroundImageProps {
  src: any;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ src }) => (
  <Box position="absolute" w="100vw" h="100vh" overflow="hidden" zIndex="-1">
    <Image
      src={src}
      layout="fill"
      objectFit="cover"
      alt="meshed background"
      quality={100}
      priority
    />
  </Box>
);

export default BackgroundImage;
