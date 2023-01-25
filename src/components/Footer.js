import React from "react";
import { Text, VStack, HStack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import "../CSS/global.css";

const Footer = () => {
  return (
    <>
      <VStack my={4}>
        <Text mb={2}> Made by Pavan Bhaskar with 💝</Text>
        <HStack>
          <a
            href="https://github.com/pavanbhaskardev"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="social-media-icons" />
          </a>
          <a
            href="https://linkedin.com/in/pavan-bhaskar-challa-4a2774244"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="social-media-icons" />
          </a>

          <a
            href="https://twitter.com/pavanch80091410"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className="social-media-icons" />
          </a>
          <a
            href="https://www.instagram.com/pavan_bhaskar_ch/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="social-media-icons" />
          </a>
        </HStack>
      </VStack>
    </>
  );
};

export default Footer;
