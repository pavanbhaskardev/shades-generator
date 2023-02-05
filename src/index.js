import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import customTheme from "./theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode="light" />
      <App />
    </ChakraProvider>
  </>
);
