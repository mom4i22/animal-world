// Footer.js
import { Box, Text, Flex } from "@chakra-ui/react";

const Footer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <Box bg="transparent" color={color} py={4} mt={4}>
      <Flex justify="center" align="center">
        <Text fontSize="sm">Created by Your Name</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
