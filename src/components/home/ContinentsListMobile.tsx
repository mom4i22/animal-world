import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ContinentsListProps } from "../../models";

const ContinentsList: React.FC<ContinentsListProps> = ({
  continents,
  onSelectContinent,
}) => {
  return (
    <Flex direction="column" gap={4} p={4}>
      {continents.map((continent) => (
        <Card
          key={continent.name}
          direction={{ base: "row", sm: "row" }}
          overflow="hidden"
          boxShadow="2xl"
          bgImage={continent.imageUrl}
          _hover={{ boxShadow: "lg" }}
          p={5}
        >
          <Stack>
            <Box borderRadius={20} bgColor="hsla(0, 1%, 40%, 0.6)">
              <CardBody>
                <Heading size="md" color="#F3CF3B">
                  {continent.name}
                </Heading>
                <Text py="2" color="wheat">
                  {continent.funFact}
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="yellow"
                  onClick={() => onSelectContinent?.(continent.name)}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Box>
          </Stack>
        </Card>
      ))}
    </Flex>
  );
};

export default ContinentsList;
