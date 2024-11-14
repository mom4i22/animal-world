import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimalsList from "../components/animals/AnimalsList";
import DetailsDrawer from "../components/animals/DetailsDrawer";
import { useFetchAnimals } from "../hooks/useFetchAnimals";
import { Animal } from "../models";

const Continents: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Animal | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { continentName } = useParams();
  const { animals } = useFetchAnimals(continentName ?? "");

  const handleItemClick = (item: Animal) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        variant="ghost"
        mb={4}
        onClick={() => navigate(-1)}
        colorScheme="yellow"
        _hover={{
          bgColor: "transparent",
          color: "yellow.300",
          textDecoration: "underline",
        }}
        borderRadius="full"
      >
        &#8592; Back to home page
      </Button>
      <AnimalsList data={animals} onItemClick={handleItemClick} />
      <DetailsDrawer isOpen={isOpen} onClose={onClose} item={selectedItem} />
    </Box>
  );
};

export default Continents;
