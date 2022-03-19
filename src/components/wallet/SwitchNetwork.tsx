import React from "react";
import { useNetwork, useAccount } from "wagmi";
import { Button } from "@/components/elements";
import config from "../../../config.json";

export const SwitchNetwork = () => {
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();

  const [{ data: accountData }] = useAccount();

  if (!accountData) return null;

  const handleSwitch = async () => {
    if (switchNetwork) switchNetwork(config.network.id);
  };

  if (networkData.chain?.id === config.network.id) return null;

  return (
    <div>
      <Button
        className="text-xs border-none text-red-600 shadow-sm"
        onClick={() => handleSwitch()}
      >
        change to network {config.network.id}
      </Button>
    </div>
  );
};
