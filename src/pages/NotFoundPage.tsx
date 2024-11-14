import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="#33333"
      color="red.400"
      p={4}
    >
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={6}>
        Oops! The page you're looking for does not exist.
      </Text>
      <Button colorScheme="yellow" onClick={handleGoHome}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
