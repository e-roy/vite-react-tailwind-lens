import React, { useState, useEffect } from "react";
import { Button } from "@/components/elements";
import { useContract, useSigner } from "wagmi";
import GreeterABI from "@/abis/Greeter.json";

// Rinkeby Testnet Contract Address
const contractAddress = "0x7e1D33FcF1C6b6fd301e0B7305dD40E543CF7135";

export const Greeter = () => {
  const [{ data: signerData }] = useSigner();
  const [greeterMsg, setGreeterMsg] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const greeterContract = useContract({
    addressOrName: contractAddress,
    contractInterface: GreeterABI,
    signerOrProvider: signerData,
  });

  // automatically get greeter message on mount
  useEffect(() => {
    if (greeterContract.signer) {
      const getGreeter = async () => {
        const greeter = await greeterContract.greet();
        setGreeterMsg(greeter);
      };
      getGreeter();
    }
  }, [greeterContract]);

  const handleGetGreet = async () => {
    if (greeterContract.signer) {
      const greeter = await greeterContract.greet();
      setGreeterMsg(greeter);
    }
  };

  const handleSetGreet = async () => {
    if (greeterContract.signer) {
      const tx = await greeterContract.setGreeting(userMsg);
      await tx.wait();
      handleGetGreet();
    }
  };

  return (
    <div className="m-2 p-4 border rounded shadow">
      <div className="mb-8">
        <span className="text-sm text-red-400">Rinkeby Network Only</span>
        <div className="py-2">Greeter Message : {greeterMsg}</div>
        <Button onClick={() => handleGetGreet()}>
          Refresh Greeter Message
        </Button>
      </div>

      <div>
        <div className="py-2">Set Greeter Meesage</div>
        <input
          className="border border-stone-500 rounded-xl p-2 mr-4 mb-4"
          type="text"
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          placeholder="type your message"
        />
        <Button onClick={() => handleSetGreet()}>Set Greeter Message</Button>
      </div>
    </div>
  );
};
