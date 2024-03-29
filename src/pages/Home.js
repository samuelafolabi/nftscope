import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const { isConnected, isConnecting } = useAccount();
  let navigate = useNavigate();
  if (isConnected) {
    navigate("/nftlist");
  }
  return (
    <Box>
      <Flex height="80vh" justifyContent="center" alignItems="center">
        <VStack>
          <Text fontSize={{ base: "18vw", md: "12vw" }} textAlign="center">
            See the <span> nfts </span> you've got
          </Text>
          <ConnectKitButton />
        </VStack>
      </Flex>
    </Box>
  );
}

export default Home;
