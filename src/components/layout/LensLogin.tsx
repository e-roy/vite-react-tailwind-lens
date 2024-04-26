import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { generateChallenge, authenticate } from "@/lib/apollo/auth/login";
import { setAuthenticationToken } from "@/lib/apollo/auth/state";
import { Button } from "@/components/elements";
import { useUser } from "./UserContext";

export const LensLogin: React.FC = () => {
  const { address } = useAccount();
  const { currentUser } = useUser();
  const { signMessageAsync } = useSignMessage();

  const handleLogin = async () => {
    if (!address || !currentUser?.id) return;

    try {
      const challenge = await generateChallenge(address, currentUser.id);
      if (
        !challenge?.data?.challenge?.text ||
        !challenge?.data?.challenge?.id
      ) {
        console.error("Invalid challenge data");
        return;
      }

      const signature = await signMessageAsync({
        message: challenge.data.challenge.text,
      });

      const accessTokens = await authenticate(
        challenge.data.challenge.id,
        signature
      );

      if (accessTokens?.data?.authenticate) {
        await setAuthenticationToken({ token: accessTokens.data.authenticate });
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (!address || !currentUser?.id) return null;

  return <Button onClick={handleLogin}>Login with Lens</Button>;
};
