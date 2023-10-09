import React from "react";
import {
  Text,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
  Center,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import "../CSS/global.css";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navBarColor = useColorModeValue("whiteAlpha.400", "blackAlpha.400");
  return (
    <>
      <Flex
        p={[2, 0]}
        pos="sticky"
        top={0}
        zIndex={9999}
        bg={navBarColor}
        backdropFilter="auto"
        backdropBlur="8px"
        boxShadow="base"
      >
        <Spacer />
        <Text className="nav-heading" fontSize={["1.75rem", "2.5rem"]}>
          Shades Generator
        </Text>
        <Spacer />
        <Tooltip label={colorMode === "dark" ? "light mode" : "darkmode"}>
          <Center>
            <IconButton
              aria-label="switch theme"
              mr={[0, 0, "1rem"]}
              icon={
                colorMode === "dark" ? (
                  <FaSun className="sun-icon" color="#F6E05E" />
                ) : (
                  <FaMoon className="moon-icon" color="#63b3ed" />
                )
              }
              onClick={() => toggleColorMode()}
              variant="solid"
            />
          </Center>
        </Tooltip>
      </Flex>
    </>
  );
};

export default Navbar;
