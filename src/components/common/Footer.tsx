import { Box, Flex, Text } from "@chakra-ui/react";

const Footer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <Box bg="transparent" color={color} py={4} mt={4}>
      <Flex justify="center" align="center">
        <Text fontSize="sm">Created by Momchil Trenchev, F119589 </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
