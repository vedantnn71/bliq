import { extendTheme } from "@chakra-ui/react";
import { colors, fonts, shadows } from "./foundations";
import { Button } from "./components";

const theme: any = extendTheme({
  colors,
  fonts,
  shadows,
  components: {
    Button,
  },
});

export default theme;
