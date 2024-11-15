import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../assets/styles/Animals.css";
import { useWindowResize } from "../../hooks/useWinowResize";
import { Animal } from "../../models";

interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: Animal | null;
}

const DetailsDrawer: React.FC<DetailsDrawerProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { isMobile } = useWindowResize();

  useEffect(() => {
    let timer: number | undefined;

    if (isImageLoaded) {
      timer = window.setTimeout(() => {
        setShowImage(true);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [isImageLoaded]);

  useEffect(() => {
    if (isOpen) {
      setIsImageLoaded(false);
      setShowImage(false);
    }
  }, [isOpen]);

  return (
    <Drawer
      variant={isMobile ? "" : "secondary"}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent
        bg="yellow.500"
        color="#333333"
        className="drawerClass"
        maxWidth={isMobile ? "90vw" : "30vw"}
      >
        <DrawerCloseButton />
        <DrawerHeader>{item?.name}</DrawerHeader>

        {!showImage && (
          <Box
            height="25vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Box>
        )}

        {item?.imageUrl && (
          <Image
            borderRadius="20px"
            src={item?.imageUrl}
            alt={item?.name}
            height="35vh"
            p={2}
            onLoad={() => setIsImageLoaded(true)}
            fallbackSrc="https://lh5.googleusercontent.com/proxy/6GqkEKacZBl4xmcSgeJZ_EzDbh4LBdv7J5u1A1HdbAXbU8jrYJHTvk6zyHmHxdA53BphWLT3HLFg0_N3gAwkEbMVF1iIEUZzd3Bs_eM3ACXDwMokenhEQHTLTUL3a7BB_f5JH3oKywsYXbu37KrJ"
            display={showImage ? "block" : "none"}
          />
        )}

        <DrawerBody>
          <Tag bgColor="yellow.700" color="yellow.100" borderRadius="full">
            {item?.type}
          </Tag>
          <Divider my={4} />
          <Text>{item?.description}</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailsDrawer;
