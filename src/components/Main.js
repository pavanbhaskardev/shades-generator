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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Center,
  Text,
  Tag,
  TagLabel,
  Alert,
  AlertIcon,
  CloseButton,
  Spacer,
  useToast,
  Box,
} from "@chakra-ui/react";

const Main = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [colorCode, setColorCode] = useState("");
  const [alertUser, setAlertUser] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [sliderStatus, setSliderStatus] = useState(true);

  //chakra toast on copy color
  const toast = useToast();

  function generateColorCode() {
    if (
      colorCode.length === 0 ||
      colorCode.length < 6 ||
      colorCode.length > 7
    ) {
      setAlertUser(true);
      setColorList([]);
      setSliderStatus(true);
      return;
    }
    if (colorCode.length > 5 && colorCode.length <= 7) {
      if (colorCode.length === 6 && colorCode.includes("#")) {
        setAlertUser(true);
        setColorList([]);
        setSliderStatus(true);
        return;
      }
      //slicing if first character is hash
      if (colorCode.length === 7 && colorCode.slice(0, 1) === "#") {
        const colorCodeWithoutHash = colorCode.slice(1, colorCode.length);
        setColorCode(colorCodeWithoutHash);
      }
      //slicing if first character is number
      if (colorCode.length === 7 && colorCode.slice(0, 1) !== "#") {
        setAlertUser(true);
        setColorList([]);
        setSliderStatus(true);

        return;
      }

      setAlertUser(false);
      setSliderStatus(false);

      //generating rgb code so we can add opacity to it and generate shades
      const splittedHexColor = colorCode.match(/.{1,2}/g);

      const rgbColorCode = [
        parseInt(splittedHexColor[0], 16),
        parseInt(splittedHexColor[1], 16),
        parseInt(splittedHexColor[2], 16),
      ];

      let shadesList = [];

      for (let i = 1; i <= sliderValue; i++) {
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
            "#" +
            hexCodeConvertor(r) +
            hexCodeConvertor(g) +
            hexCodeConvertor(b)
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
          status: "info",
          duration: 4000,
        });
      }
    } else {
      setAlertUser(true);
    }
  }

  //Copy hexcode to clipboard
  const copyHexCode = (hexCode) => {
    navigator.clipboard.writeText(hexCode);
    console.log("copied code", hexCode);
    toast({
      description: `${hexCode} copied to clipboard`,
      status: "success",
      duration: 2000,
    });
  };

  //Copy rgbcode to clipboard
  const copyRgbCode = (rgbCode) => {
    let rgbColorCode = `rgb(${rgbCode[0]},${rgbCode[1]},${rgbCode[2]})`;
    navigator.clipboard.writeText(rgbColorCode);
    toast({
      description: `${rgbColorCode} copied to clipboard`,
      status: "success",
      duration: 2000,
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
          onClick={() => {
            generateColorCode();
          }}
        >
          Generate
        </Button>
      </Flex>

      {/* slider */}
      <Flex gap={2} mx={[3, 3, 3, 0]} mt={5}>
        <Text>🌈 Color Shades</Text>
        <Tag colorScheme="messenger">
          <TagLabel>{sliderValue}</TagLabel>
        </Tag>
      </Flex>
      <Center>
        <Slider
          defaultValue={sliderValue}
          max={20}
          onChange={(value) => setSliderValue(value)}
          w={["95vw", "95vw", "95vw", "900px"]}
          mt={2}
          colorScheme="messenger"
          isDisabled={sliderStatus}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Center>
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
                    <Td bgColor={`${hexCode} !important`}></Td>
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
                      {hexCode}
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
