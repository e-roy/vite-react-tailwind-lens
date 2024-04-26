import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { generateChallenge, authenticate } from "@/lib/apollo/auth/login";
import { setAuthenticationToken } from "@/lib/apollo/auth/state";
import { Button } from "@/components/elements";
import { useUser } from "./UserContext";

export const LensLogin = () => {
  const { address } = useAccount();
  const { currentUser } = useUser();
  const { signMessageAsync } = useSignMessage();

  const id = currentUser?.id || null;

  const handleLogin = async () => {
    if (!address && !id) return;
    const challenge = await generateChallenge(address as string, id as string);
    if (!challenge) return;
    const signature = await signMessageAsync({
      message: challenge.data.challenge.text,
    });
    const accessTokens = await authenticate(
      challenge.data.challenge.id as string,
      signature as string
    );
    await setAuthenticationToken({ token: accessTokens.data.authenticate });
  };

  if (!address && !id) return;
  return (
    <Button className="" onClick={() => handleLogin()}>
      Login with Lens
    </Button>
  );
};
