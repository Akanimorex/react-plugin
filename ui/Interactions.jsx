// // create a parent and child condition.
// // the wagmi will work on the child not in the parent


import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_API_KEY }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "React plugin",
  projectId: "c07a8b898d6fe54dc9fe9fa799a81d07",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

//blockchain ends

import Wrapper from "./Wrapper";
import ConnectWallet from "../components/ConnectWallet";

const Interactions = () => {

  

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Wrapper/>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Interactions;
