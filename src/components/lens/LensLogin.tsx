import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { generateChallenge, authenticate } from "@/lib/apollo/auth/login";
import { setAuthenticationToken } from "@/lib/apollo/auth/state";
import { Button } from "@/components/elements";

export const LensLogin = () => {
  const { data: accountData } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleLogin = async () => {
    const challenge = await generateChallenge(accountData?.address as string);
    if (!challenge) return;
    const signature = await signMessageAsync({
      message: challenge.data.challenge.text,
    });
    const accessTokens = await authenticate(
      accountData?.address as string,
      signature as string
    );
    await setAuthenticationToken({ token: accessTokens.data.authenticate });
  };

  if (!accountData?.address) return null;
  return (
    <Button className="" onClick={() => handleLogin()}>
      Login with Lens
    </Button>
  );
};
