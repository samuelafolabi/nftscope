import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
  fonts: {
    heading: `'Bebas Neue', sans-serif`,
    body: `'Bebas Neue', sans-serif`,
  },
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
  },
});

export default theme;
