import { createRoot } from "react-dom/client";
import "./index.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import LoadingScreen from "./components/common/LoadingScreen.tsx";
import { router } from "./router/router.config.tsx";

const colors = {
  brand: {
    100: "#f2de6f", // Light Yellow
    200: "#F3CF3B", // Bright Yellow
    300: "#666464", // Light Gray
    400: "#333333", // Dark Gray
  },
};

const theme = extendTheme({
  colors,
  components: {
    Drawer: {
      parts: ["dialog", "header", "body"],
      variants: {
        primary: {
          secondary: {
            dialog: {
              width: "30vw",
            },
          },
        },
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "light" ? "brand.300" : "brand.300",
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
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
    </ChakraProvider>
  );
}
