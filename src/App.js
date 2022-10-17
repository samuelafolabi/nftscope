import logo from "./logo.svg";
import "./App.css";

import { Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import NftList from "./pages/NftList";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

import { createClient, WagmiConfig } from "wagmi";
// import { chains, wagmiClient } from "./web3/connectWeb3";
import { client } from "./web3/connectWeb3";
import { ConnectKitProvider } from "connectkit";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // <ChakraProvider>
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          mode="light"
          customTheme={{
            "--ck-font-family": "Bebas Neue",
            "--ck-background": "#F0FFF3",
            "--ck-connectbutton-color": "black",
            "--ck-connectbutton-hover-color": "black",
            "--ck-connectbutton-active-color": "white",
            "--ck-connectbutton-background": "#D9D9D9",
            "--ck-connectbutton-hover-background": "#F0FFF3",
            "--ck-connectbutton-active-background": "#AE5050",
            "--ck-connectbutton-border-radius": "0px",
            "--ck-border-radius": "0px",
          }}
          options={{
            disclaimer: (
              <>
                NftScope connects you to your wallet. I assure you all your
                assets are safe.
              </>
            ),
            showBalance: true,
            hideQuestionMarkCTA: true,
          }}
        >
          <Box className="App">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/nftlist" element={<NftList />}></Route>
            </Routes>
          </Box>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
