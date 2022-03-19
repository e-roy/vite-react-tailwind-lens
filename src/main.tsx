import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { providers } from "ethers";
import { Connector, Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

import "./index.css";
import App from "./App";

const chains = [...defaultChains];
const defaultChain = chain.mainnet;

const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string;
const infuraId = import.meta.env.VITE_INFURA_ID as string;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  // const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? defaultChain.rpcUrls[0];
  return [
    // MetaMask
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),

    // WalletConnect
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     infuraId,
    //     qrcode: true,
    //   },
    // }),

    // Coinbase Wallet
    // new WalletLinkConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //     jsonRpcUrl: `${rpcUrl}/${infuraId}`,
    //   },
    // }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

// Set up providers
const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy: alchemyId,
      infura: infuraId,
    }
  );
const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined;

ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
