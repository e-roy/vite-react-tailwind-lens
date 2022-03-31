import React, { useEffect, useState } from "react";
import { Modal, Button } from "../elements";
import { useConnect, useAccount } from "wagmi";
import { Auth } from "./Auth";

import metamaskLogo from "@/images/metamask-logo.png";
import walletConnectLogo from "@/images/walletconnect-logo.png";

import {
  getAuthenticationToken,
  removeAuthenticationToken,
} from "@/lib/auth/state";
import { useQuery } from "@apollo/client";
import { VERIFY } from "@/queries/auth/verify";

export const ConnectWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);
  const [
    {
      data: { connector, connectors },
      loading,
    },
    connect,
  ] = useConnect();

  const [{ data: accountData }, disconnect] = useAccount();

  const { data: verifyData, loading: verifyLoading } = useQuery(VERIFY, {
    variables: {
      request: { accessToken: getAuthenticationToken() },
    },
  });
  let isVerified = false;
  if (verifyData?.verify) isVerified = true;

  useEffect(() => {
    if (accountData) {
      setIsWalletConnected(true);
    }
  }, [accountData]);

  const handleLogout = async () => {
    if (accountData?.address) {
      disconnect();
      await removeAuthenticationToken();
      setIsWalletConnected(false);
    }
  };

  if (loading) return <div className="h-12"></div>;

  return (
    <div>
      {!isWalletConnected ? (
        <Button onClick={() => setIsModalOpen(true)}>Connect Wallet</Button>
      ) : (
        <>
          {!isVerified ? (
            <Auth />
          ) : (
            <>
              <Button onClick={() => handleLogout()}>Logout</Button>
            </>
          )}
        </>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="bg-white">
            {connectors.map((x) => (
              <button
                className={"hover:bg-gray-100 text-gray-700 p-4 w-full rounded"}
                disabled={!x.ready}
                key={x.name}
                onClick={() => {
                  connect(x);
                  setIsModalOpen(false);
                }}
              >
                <div>
                  {x.name === "MetaMask" && (
                    <img
                      src={metamaskLogo}
                      width={50}
                      height={50}
                      alt="MetaMask"
                      className="mx-auto"
                    />
                  )}
                  {x.name === "WalletConnect" && (
                    <img
                      src={walletConnectLogo}
                      width={50}
                      height={50}
                      alt="Wallet Connect"
                      className="mx-auto"
                    />
                  )}
                </div>
                <div className={"text-gray-900 text-3xl font-bold my-4"}>
                  {x.name}
                </div>
                <div className={"text-gray-400 font-regular text-xl my-4"}>
                  {x.name === "MetaMask" && "Connect to your MetaMask Wallet"}
                  {x.name === "WalletConnect" &&
                    "Scan with WalletConnect to connect"}
                </div>
                <div>
                  {!x.ready && " (unsupported)"}
                  {loading && x.name === connector?.name && "…"}
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};
