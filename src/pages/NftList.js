import React, { useState, useEffect } from "react";
import { Box, Flex, Text, VStack, Input, Img } from "@chakra-ui/react";

import { Network, Alchemy } from "alchemy-sdk";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

function NftList() {
  //setting initial state of nft
  const [myNfts, setMyNfts] = useState([]);
  const [search, setSearch] = useState("");
  // setting address as the account
  const { address, isDisconnected, isConnected, isConnecting } = useAccount();
  // setting api key for fetching
  const settings = {
    apiKey: "6sIDTgwfsNMF3NtK5W3h8J52KQfX90ld",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);
  // fetching fucntion according to alchemy documentations
  const fetchnftList = async () => {
    await alchemy.nft.getNftsForOwner(`${address}`).then(setMyNfts);
  };

  // fetching with use effect
  useEffect(() => {
    fetchnftList();
  }, []);

  console.log("mynfts", myNfts);
  const newNftList = myNfts?.ownedNfts;
  //making search
  const handleSearch = () => {
    return newNftList.filter(
      (nft) =>
        nft.contract?.name.toLowerCase().includes(search) ||
        nft.contract?.address.toLowerCase().includes(search)
    );
  };
  if (isDisconnected) {
    return (
      <VStack marginTop="1rem">
        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          hey fren. It seems your wallet is disconnected🥴!
        </Box>
        <ConnectKitButton />
      </VStack>
    );
  }
  if (isConnecting) {
    return (
      <VStack marginTop="1rem">
        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          Okies... I am trying to connect now🙂!
        </Box>
        <ConnectKitButton />
      </VStack>
    );
  }
  return (
    <div>
      <VStack>
        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          {!newNftList ? (
            "🙂"
          ) : (
            <>
              {myNfts?.totalCount < 1 ? (
                <>You seem to have no nft on this chain🤔. ngmi😒.</>
              ) : (
                <>
                  You've got {myNfts?.totalCount}NFT
                  {myNfts?.totalCount > 1 ? "s" : ""} in your eth mainnet
                  chain😍. You mind sharing some with me?😋
                </>
              )}
            </>
          )}
        </Box>
        <Input
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          placeholder="search with name or ca"
          width={{
            base: "90%",
            md: "60%",
            lg: "80%",
            "2xl": "50%",
          }}
          style={{
            background: "white",
            // width: "40%",
            height: "3rem",
            fontFamily: "inherit",
            fontSize: "1.5rem",

            border: "1.5px solid #000000",
            padding: "1.5rem 1rem",
            textAlign: "center",
          }}
        />
      </VStack>
      {!newNftList ? (
        <>loading</>
      ) : (
        <>
          {handleSearch().map((item) => {
            if (!item) {
              return <>Loading</>;
            }

            return (
              <Flex
                justifyContent={{ md: "center", lg: "center", "2xl": "center" }}
                gap="5rem"
                marginBottom="10rem"
                marginTop="4rem"
                direction={{ base: "column", md: "row" }}
                key={item?.tokenId}
              >
                {/* image box --start */}

                <Img
                  src={item?.media[0]?.thumbnail}
                  width={{ base: "90vw", md: "32rem" }}
                  style={{
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                  alt={item?.contract?.name}
                />

                {/* image box --end */}

                {/* content box --start */}
                <Box
                  width={{
                    lg: "50rem",
                  }}
                >
                  <Text
                    fontSize="3rem"
                    letterSpacing="0.1em"
                    sx={{
                      marginBottom: "2.5rem",
                    }}
                  >
                    {item?.contract?.name} #{item?.tokenId}{" "}
                  </Text>
                  <Text
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    {item?.contract?.address}
                  </Text>
                  <Text
                    sx={{
                      marginBottom: "1rem",
                    }}
                  >
                    {item?.description}
                  </Text>
                  <Text>
                    No {item?.tokenId} of{" "}
                    {item?.contract?.totalSupply === undefined
                      ? "undefined"
                      : item?.contract?.totalSupply}
                  </Text>
                  <Box
                    sx={{
                      marginBottom: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      alchemy.nft
                        .getFloorPrice(`${item?.contract?.address}`)
                        .then((myFloorDetails) => {
                          const details = myFloorDetails;
                          console.log(details);
                          window.open(
                            `${details.openSea.collectionUrl}`,
                            "_blank"
                          );
                        });
                    }}
                  >
                    <span>see full collection</span>
                  </Box>

                  <Text>{item?.media[0]?.bytes / 1000} KB</Text>
                  <Box
                    sx={{
                      marginBottom: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(`${item?.media[0]?.gateway}`, "_blank")
                    }
                  >
                    <a>
                      <span>download raw file</span>
                    </a>
                  </Box>
                </Box>
                {/* content box --end */}
              </Flex>
            );
          })}
        </>
      )}
    </div>
  );
}

export default NftList;
