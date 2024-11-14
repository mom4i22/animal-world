import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ourMissionHeading, ourMissionText } from "../../constants";
import Footer from "../common/Footer";

const OurMission = () => {
  return (
    <>
      <section className="our-mission-section" id="mission">
        <Box
          bgImage="url('/img/cover.png')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          px={10}
        >
          <Flex
            maxW="400px"
            bg="#333333"
            color="white"
            p={6}
            borderRadius="md"
            direction="column"
            textAlign="left"
          >
            <Heading size="lg" mb={4}>
              {ourMissionHeading}{" "}
            </Heading>
            <Text fontSize="md" mb={4}>
              {ourMissionText}
            </Text>
          </Flex>
        </Box>
      </section>
      <footer className="footer-class">
        <Footer color="#333333" />
      </footer>
    </>
  );
};

export default OurMission;
