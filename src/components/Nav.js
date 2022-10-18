import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

function Nav() {
  const { isConnected, isConnecting } = useAccount();

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          nft<span>scope</span>
        </Box>
        <Box>{isConnected ? <ConnectKitButton /> : " "}</Box>
      </Flex>
    </>
  );
}

export default Nav;
