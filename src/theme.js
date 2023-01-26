import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

const customTheme = extendTheme({
  fonts: {
    heading: "inter",
    body: "inter",
  },
});

export default customTheme;
