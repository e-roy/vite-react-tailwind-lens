import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "./UserContext";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LensLogin } from "./LensLogin";

import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "@/queries/profile/get-profiles";

import { ENV_PROD, ENV_DEV } from "@/constants";
import { Profile } from "@/generated/graphqlGenerated";
import { Avatar } from "../elements/Avatar";

interface ProfilesData {
  profiles: {
    items: Profile[];
  };
}

export const AppLayout = () => {
  const navagate = useNavigate();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const { address } = useAccount();
  const { data: profileData, loading } = useQuery<ProfilesData>(GET_PROFILES, {
    variables: {
      request: { where: { ownedBy: [address] } },
    },
  });

  useEffect(() => {
    if (profileData) {
      setCurrentUser(profileData?.profiles?.items[0]);
    }
  }, [profileData]);

  if (loading) return <div>Loading...</div>;

  //   console.log(currentUser);

  return (
    <UserProvider>
      <div className="h-screen flex flex-col">
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

          <ConnectButton />
        </header>
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
        <footer className="text-center h-20 text-md text-stone-100">
          <div className="flex shadow-lg rounded-lg  md:mx-auto border-2 max-w-3xl ">
            <button
              onClick={() => navagate("/")}
              className="w-full border-2 p-1 rounded text-gray-700 uppercase font-semibold text-lg hover:bg-gray-200"
            >
              home
            </button>
            <button
              onClick={() => navagate("/post")}
              className="w-full border-2 p-1 rounded text-gray-700 uppercase font-semibold text-lg hover:bg-gray-200"
            >
              post
            </button>
          </div>
          {ENV_PROD && (
            <div className="border h-8 border-stone-900 bg-stone-800 pt-1 uppercase font-bold">
              production
            </div>
          )}
          {ENV_DEV && (
            <div className="border h-8 border-purple-700 bg-purple-600 pt-1 uppercase font-bold">
              development
            </div>
          )}
        </footer>
      </div>
    </UserProvider>
  );
};
