import React from "react";
import { Avatar } from "../elements/Avatar";
import { useUser } from "./UserContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LensLogin } from "./LensLogin";

export const Header = () => {
  const { currentUser } = useUser();

  return (
    <header className="md:flex md:justify-between p-4 space-y-4 md:space-y-0">
      <div className={`flex space-x-8`}>
        {currentUser && (
          <>
            <LensLogin />
            <div className={`flex my-auto space-x-2`}>
              <Avatar profile={currentUser} size="h-6 w-6" />
              <div className="font-semibold">
                @{currentUser?.handle?.localName}
              </div>
            </div>
          </>
        )}
      </div>

      <ConnectButton showBalance={false} />
    </header>
  );
};
