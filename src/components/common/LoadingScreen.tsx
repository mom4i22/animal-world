import { Spinner } from "@chakra-ui/react";
import "../../assets/styles/LoadingScreen.css";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <Spinner size="xl" thickness="4px" color="brand.100" speed="0.65s" />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingScreen;
