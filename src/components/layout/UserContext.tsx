import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Profile } from "@/generated/graphqlGenerated";
import { useAccount } from "wagmi";

import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "@/queries/profile/get-profiles";

interface ProfilesData {
  profiles: {
    items: Profile[];
  };
}

interface UserContextType {
  currentUser: Profile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  const { address } = useAccount();
  const { data: profileData } = useQuery<ProfilesData>(GET_PROFILES, {
    variables: {
      request: { where: { ownedBy: [address] } },
    },
    skip: !address,
  });

  useEffect(() => {
    if (address && profileData?.profiles?.items[0]) {
      setCurrentUser(profileData.profiles.items[0]);
    } else {
      setCurrentUser(null);
    }
  }, [address, profileData]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
