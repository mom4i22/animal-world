import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.config.tsx";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import LoadingScreen from "./components/common/LoadingScreen.tsx";

const colors = {
  brand: {
    100: "#f2de6f", // Light Yellow
    200: "#fcd800", // Bright Yellow
    300: "#666464", // Light Gray
    400: "#333333", // Dark Gray
  },
};

const theme = extendTheme({
  colors,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "brand.300" : "brand.300", // Light Gray in light mode, Dark Gray in dark mode
        color: "white",
        transition: "background-color 0.2s ease",
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
      </ChakraProvider>
    </StrictMode>
  );
}
