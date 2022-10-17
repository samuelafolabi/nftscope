import React, { useState, useEffect } from "react";
import { Box, Flex, Text, VStack, Input, Img } from "@chakra-ui/react";

import { Network, Alchemy } from "alchemy-sdk";
import { useAccount } from "wagmi";

function NftList() {
  //setting initial state of nft
  const [myNfts, setMyNfts] = useState([]);
  const [search, setSearch] = useState("");
  const [floorDetails, setFloorDetails] = useState("");
  // setting address as the account
  const { address } = useAccount();
  // setting api key for fetching
  const settings = {
    apiKey: "GbHOpS4z2fCeERYz6nij9wERLRD86UNa",
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
  // .then(
  //   window.open(
  //     `${floorDetails?.openSea?.collectionUrl}`,
  //     "_blank"
  //   )
  // )

  // const findPrice = () => {
  //   alchemy.nft.getFloorPrice(`${item?.contract?.name}`).then(console.log);
  // };

  return (
    <div>
      <VStack>
        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          You've got {myNfts?.totalCount}NFT{myNfts?.totalCount > 1 ? "s" : ""}{" "}
          in your wallet
        </Box>
        <input
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          placeholder="search with name or ca"
          style={{
            background: "white",
            width: "40%",
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
                gap="5rem"
                marginBottom="10rem"
                marginTop="4rem"
                direction={{ base: "column", md: "row" }}
              >
                {/* image box --start */}

                <img
                  src={item?.media[0]?.thumbnail}
                  style={{
                    objectFit: "cover",
                    // height: "36rem",
                    width: "32rem",
                  }}
                  alt={item?.contract?.name}
                />

                {/* image box --end */}

                {/* content box --start */}
                <Box>
                  <Text
                    fontSize="3rem"
                    letterSpacing="0.1em"
                    sx={{
                      marginBottom: "2.5rem",
                    }}
                    // onClick={() =>
                    //   alchemy.nft
                    //     .getFloorPrice(`${item?.contract?.address}`)
                    //     .then(setFloorDetails)
                    //     .then(console.log("floor details", floorDetails))

                    //     .then(
                    //       window.open(
                    //         `${floorDetails?.openSea?.collectionUrl}`,
                    //         "_blank"
                    //       )
                    //     )
                    // }

                    // onClick={() =>
                    //   handleSearch().map((item) => {
                    //     return alchemy.nft
                    //       .getFloorPrice(`${item?.contract?.address}`)
                    //       .then(setFloorDetails)
                    //       .then(console.log("floor details", floorDetails))

                    //       .then(
                    //         window.open(
                    //           `${floorDetails?.openSea?.collectionUrl}`,
                    //           "_blank"
                    //         )
                    //       );
                    //   })
                    // }
                  >
                    {item?.contract?.name} #{item?.tokenId}{" "}
                    {floorDetails?.openSea?.floorPrice}
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
                    }}
                  >
                    <a>
                      <span>see full collection</span>
                    </a>
                  </Box>

                  <Text>{item?.media[0]?.bytes / 1000} KB</Text>
                  <Box
                    sx={{
                      marginBottom: "1rem",
                    }}
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