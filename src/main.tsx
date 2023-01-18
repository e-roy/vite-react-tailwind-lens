import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Imports
import { createClient, WagmiConfig, configureChains } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";

import { ENV_PROD, ENV_DEV, IS_PRODUCTION } from "@/constants";

const alchemyId = import.meta.env.VITE_PROD_ALCHEMY_ID as string;
const infuraId = import.meta.env.VITE_PROD_INFURA_ID as string;

const networks = [];
if (ENV_PROD && IS_PRODUCTION) {
  networks.push(polygon);
}

if (ENV_DEV || !IS_PRODUCTION) {
  networks.push(polygonMumbai);
}

// const { chains, provider } = configureChains(networks, [
//   alchemyProvider({ alchemyId }),
//   publicProvider(),
// ]);

const { chains, provider, webSocketProvider } = configureChains(networks, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Lens Vite - Starter App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <ApolloProvider client={apolloClient()}>
          <HashRouter>
            <App />
          </HashRouter>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
