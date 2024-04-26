import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Imports
import { WagmiProvider, http } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo";

// import { ENV_PROD, ENV_DEV, IS_PRODUCTION } from "@/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { type Chain } from "viem";

export const amoy_testnet = {
  id: 80002,
  name: "Amoy Testnet",
  nativeCurrency: { name: "Amoy", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: { http: [" https://rpc-amoy.polygon.technology/"] },
  },
  blockExplorers: {
    default: { name: "Oklink", url: "https://www.oklink.com/amoy" },
  },
  testnet: true,
} as const satisfies Chain;

// const networks = [];
// if (ENV_PROD && IS_PRODUCTION) {
//   networks.push(polygon);
// }

// if (ENV_DEV || !IS_PRODUCTION) {
//   networks.push(polygonMumbai);
// }

export const config = getDefaultConfig({
  appName: "Lens Vite - Starter App",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygon, polygonMumbai, amoy_testnet],
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [amoy_testnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          <ApolloProvider client={apolloClient()}>
            <HashRouter>
              <App />
            </HashRouter>
          </ApolloProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
