import { createClient } from "wagmi";
import { getDefaultClient } from "connectkit";

export const alchemyId = process.env.ALCHEMY_ID;

export const client = createClient(
  getDefaultClient({
    appName: "NftScope",
    alchemyId,
  })
);
