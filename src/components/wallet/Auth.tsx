import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { generateChallenge, authenticate } from "@/lib/auth/login";
import { setAuthenticationToken } from "@/lib/auth/state";
import { Button } from "@/components/elements";

type AuthProps = {};

export const Auth = ({}: AuthProps) => {
  const [{ data: accountData }] = useAccount();
  const [{}, signMessage] = useSignMessage();

  const handleLogin = async () => {
    console.log("login component");

    const challenge = await generateChallenge(accountData?.address as string);
    if (!challenge) return;
    const signature = await signMessage({
      message: challenge.data.challenge.text,
    });
    const accessTokens = await authenticate(
      accountData?.address as string,
      signature.data as string
    );
    await setAuthenticationToken({ token: accessTokens.data.authenticate });
  };

  return (
    <div>
      <Button className="" onClick={() => handleLogin()}>
        Login
      </Button>
    </div>
  );
};
