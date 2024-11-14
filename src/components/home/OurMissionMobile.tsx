import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { ourMissionHeading, ourMissionText } from "../../constants";

const OurMissionMobile = () => {
  return (
    <>
      <Box as="section" mt="90px" p={6}>
        <Heading size="lg" mb={4}>
          {ourMissionHeading}
        </Heading>
        <Text fontSize="md" mb={4}>
          {ourMissionText}
        </Text>
      </Box>

      <Box as="section">
        <Image
          src="/img/cover.png"
          alt="Nature and Wildlife Image"
          width="100%"
        />
      </Box>
    </>
  );
};

export default OurMissionMobile;
