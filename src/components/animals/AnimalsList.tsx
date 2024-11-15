import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  List,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { searchAnimalsText } from "../../constants";
import { Animal } from "../../models";

interface AnimalsListProps {
  data: Animal[];
  onItemClick: (item: Animal) => void;
}

const AnimalsList: React.FC<AnimalsListProps> = ({ data, onItemClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredItems = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const groupedItems = filteredItems.reduce((acc, item) => {
    const firstLetter = item.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, Animal[]>);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleItemClick = (item: Animal) => {
    onItemClick(item);
  };

  const handleLetterClick = (letter: string) => {
    sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Input
        placeholder={searchAnimalsText}
        value={searchTerm}
        variant="filled"
        bgColor="#666464"
        color="white"
        borderRadius="20px"
        border="none"
        _hover={{ bg: "#666464" }}
        _focus={{ bg: "#666464", borderColor: "transparent" }}
        _active={{ bg: "#666464" }}
        colorScheme="gray"
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
        width="50%"
      />
      <HStack spacing={2} mb={4} wrap="wrap">
        {Object.keys(groupedItems).map((letter) => (
          <Button
            key={letter}
            size="xs"
            bgColor="yellow.300"
            color="yellow.700"
            _hover={{ bg: "yellow.700", color: "yellow.200" }}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </Button>
        ))}
      </HStack>
      <Box
        maxH="80vh"
        width="90vw"
        overflowY="scroll"
        p={4}
        m={3}
        border="none"
        borderRadius="md"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {Object.keys(groupedItems).map((letter) => (
          <Box
            key={letter}
            width="100%"
            mb={4}
            ref={(el) => (sectionRefs.current[letter] = el)}
          >
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {letter}
            </Text>
            <Divider mb={2} />
            <List spacing={2}>
              {groupedItems[letter].map((item) => (
                <Tag
                  key={item.id}
                  variant="outline"
                  colorScheme="yellow"
                  m={2}
                  p={2}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => handleItemClick(item)}
                  _hover={{ bg: "yellow.400", color: "yellow.700" }}
                >
                  {item.name}
                </Tag>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnimalsList;
