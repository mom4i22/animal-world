import { Box, Heading, Text, Flex } from "@chakra-ui/react";

const OurMission = () => {
  return (
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
            Saving Animals and Protecting Endangered Species
          </Heading>
          <Text fontSize="md" mb={4}>
            Our mission is to preserve the natural habitats and protect the
            delicate balance of ecosystems that support diverse animal life
            across the globe. With countless species facing the risk of
            extinction due to climate change, habitat loss, and poaching, it has
            become crucial to take action to safeguard these invaluable
            creatures. Through collaboration with local communities,
            conservation programs, and sustainable practices, we aim to create a
            world where endangered species can thrive, and natural environments
            are restored to their full beauty and diversity. Every effort
            counts, and by raising awareness and supporting conservation, we can
            build a future that respects and cherishes all forms of life on
            Earth.
          </Text>
        </Flex>
      </Box>
    </section>
  );
};

export default OurMission;
