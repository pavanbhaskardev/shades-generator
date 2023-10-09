import React, { useState } from "react";
import {
  Input,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Spacer,
  useToast,
  Box,
} from "@chakra-ui/react";

const Main = () => {
  const [colorCode, setColorCode] = useState("");
  const [alertUser, setAlertUser] = useState(false);
  const [colorList, setColorList] = useState([]);

  //chakra toast on copy color
  const toast = useToast();

  function generateColorCode(e) {
    e.preventDefault();

    if (
      colorCode.length < 6 ||
      colorCode.length > 7 ||
      (colorCode.length === 6 && colorCode.includes("#"))
    ) {
      setAlertUser(true);
      setColorList([]);
      return;
    } else {
      setAlertUser(false);
    }

    if (colorCode.length === 7 && colorCode.includes("#")) {
      setColorCode((currentColor) => {
        return currentColor.slice(1, currentColor.length);
      });
    }

    //generating rgb code so we can add opacity to it and generate shades
    const splittedHexColor = colorCode.match(/.{1,2}/g);

    const rgbColorCode = [
      parseInt(splittedHexColor[0], 16),
      parseInt(splittedHexColor[1], 16),
      parseInt(splittedHexColor[2], 16),
    ];

    let shadesList = [];

    for (let i = 1; i <= 20; i++) {
      const colorShadeRgbCode = [
        Math.round(rgbColorCode[0] * (0.1 * i)),
        Math.round(rgbColorCode[1] * (0.1 * i)),
        Math.round(rgbColorCode[2] * (0.1 * i)),
      ];

      const hexCodeConvertor = (value) => {
        let generatedHexCode = value.toString(16);
        return generatedHexCode.length < 2
          ? "0" + generatedHexCode
          : generatedHexCode;
      };

      const colorShadeHexCode = (r, g, b) => {
        return (
          "#" + hexCodeConvertor(r) + hexCodeConvertor(g) + hexCodeConvertor(b)
        );
      };

      const finalHexCode = colorShadeHexCode(
        colorShadeRgbCode[0],
        colorShadeRgbCode[1],
        colorShadeRgbCode[2]
      );

      //storing the color codes whose value is less than 255
      if (
        colorShadeRgbCode[0] <= 255 &&
        colorShadeRgbCode[1] <= 255 &&
        colorShadeRgbCode[2] <= 255
      ) {
        shadesList.push({
          rgbCode: colorShadeRgbCode,
          hexCode: finalHexCode,
        });
      }
    }
    setColorList(shadesList);

    //notify the use user that not 20 color shades are generated
    if (shadesList.length > 10 && shadesList.length < 20) {
      toast({
        description: `sorry we could generate only ${shadesList.length} shades for this color`,
        position: "bottom-right",
        status: "info",
        isClosable: true,
        duration: 4000,
      });
    }
  }

  //Copy hexcode to clipboard
  const copyHexCode = (hexCode) => {
    navigator.clipboard.writeText(hexCode.toUpperCase());
    toast({
      description: `${hexCode.toUpperCase()} copied to clipboard`,
      position: "bottom-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  //Copy rgbcode to clipboard
  const copyRgbCode = (rgbCode) => {
    let rgbColorCode = `rgb(${rgbCode[0]},${rgbCode[1]},${rgbCode[2]})`;
    navigator.clipboard.writeText(rgbColorCode);
    toast({
      description: `${rgbColorCode} copied to clipboard`,
      position: "bottom-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box w={["100%", "100%", "100%", "900px"]} mx={[0, 0, "auto"]}>
      {alertUser ? (
        <Center>
          <Alert status="error" variant="left-accent" mx={3} w="90vw" mt={2}>
            <AlertIcon />
            Please enter a valid Hexcode
            <Spacer />
            <CloseButton
              onClick={() => {
                setAlertUser(false);
              }}
            />
          </Alert>
        </Center>
      ) : null}
      <form onSubmit={generateColorCode}>
        <Flex px={[3, 3, 3, 0]} gap={2} mt={5}>
          <Input
            placeholder="Enter Hexcode..."
            defaultValue={colorCode}
            onChange={(e) => {
              setColorCode(e.target.value);
            }}
            _placeholder={{ opacity: 1, color: "gray.500" }}
          />
          <Button
            colorScheme="messenger"
            htmlType="submit"
            onClick={generateColorCode}
          >
            Generate
          </Button>
        </Flex>
      </form>

      {/* table */}
      {colorList.length ? (
        <TableContainer mt={5}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Colors</Th>
                <Th>Rgb Code</Th>
                <Th>Hex Code</Th>
              </Tr>
            </Thead>
            <Tbody>
              {colorList?.map((color) => {
                const { rgbCode, hexCode } = color;
                return (
                  <Tr key={hexCode}>
                    <Td
                      bgColor={`${hexCode} !important`}
                      cursor="pointer"
                      onClick={() => copyHexCode(hexCode)}
                    ></Td>
                    <Td
                      _hover={{ cursor: "pointer" }}
                      onClick={() => {
                        copyRgbCode(rgbCode);
                      }}
                    >
                      rgb({`${rgbCode[0]},${rgbCode[1]},${rgbCode[2]}`})
                    </Td>
                    <Td
                      _hover={{ cursor: "pointer" }}
                      onClick={() => {
                        copyHexCode(hexCode);
                      }}
                    >
                      {hexCode.toUpperCase()}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Center>
            <Text mt={5} fontSize={["1rem", "1.25rem"]}>
              {alertUser ? null : "Enter Hexcode and see magic✨"}
            </Text>
          </Center>
          <Center>
            <img
              src={alertUser ? "/women-angry.png" : "/women.png"}
              className="woman-image"
              alt="woman-pic"
            />
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default Main;
