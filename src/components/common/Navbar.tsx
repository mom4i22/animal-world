import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import "../../assets/styles/Navbar.css";
import { useNavigatePage } from "../../hooks/useNavigatePage";
import { useWindowResize } from "../../hooks/useWinowResize";

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { isMobile } = useWindowResize(768);

  const { activePage, isOpen, handleNavigate, setIsOpen } = useNavigatePage({
    onNavigate,
  });

  const handleToggle = () => setIsOpen(!isOpen);

  const renderLinks = () => {
    return (
      <div className="links">
        <a
          href="#mission"
          onClick={() => handleNavigate("mission")}
          className={activePage === "mission" ? "active" : ""}
        >
          Our Mission
        </a>
        <a
          href="#explore"
          onClick={() => handleNavigate("explore")}
          className={activePage === "explore" ? "active" : ""}
        >
          Explore
        </a>
      </div>
    );
  };

  return (
    <nav className="navbar">
      {isMobile ? (
        <>
          <div className="navbar-logo">
            <Image src="/img/logo.png" alt="Logo" height={70} />
          </div>
          <Box>
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={handleToggle}
              variant="ghost"
              aria-label="Toggle Navigation"
              bg="#F3CF3B"
              color="#333333"
              _hover={{ color: "#333333", bg: "#F3CF3B" }}
            />
          </Box>

          {isOpen && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              width="100%"
              bg="#666464"
              color="#F3CF3B"
              p={4}
              textAlign="center"
            >
              {renderLinks()}
            </Box>
          )}
        </>
      ) : (
        <Flex className="navbar-links">
          <Image src="/img/logo.png" alt="Logo" height={70} />
          {renderLinks()}
        </Flex>
      )}
    </nav>
  );
};

export default Navbar;
