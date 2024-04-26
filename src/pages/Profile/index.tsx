import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/queries/profile/get-profile";
import { FollowButton } from "./components/FollowButton";
import { UnfollowButton } from "./components/UnfollowButton";
import { Avatar } from "@/components/elements/Avatar";
import { Profile } from "@/generated/graphqlGenerated";

interface ProfileData {
  profile: Profile;
}

export const ProfilePage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();

  const {
    data: profileData,
    loading,
    error,
    refetch,
  } = useQuery<ProfileData>(GET_PROFILE, {
    variables: {
      request: { forHandle: `lens/${handle}` },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const profile = profileData?.profile;

  const handleRefetch = () => {
    refetch();
  };

  if (!profile) return <div>No profile found for this handle</div>;

  return (
    <div className="flex justify-center space-x-2 w-full mt-12 overflow-hidden">
      <div className="min-w-sm border border-gray-700 bg-gray-700 text-gray-50 transition-shadow shadow-xl hover:shadow-xl min-w-max rounded-xl">
        <img
          src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg"
          className="h-48 w-96 rounded-t-xl"
          alt="Background"
        />

        <div className="flex items-center p-4">
          <div className="relative flex flex-col items-center w-full">
            <div className="h-24 w-24 md rounded-full relative items-end justify-end min-w-max -top-16 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
              <Avatar profile={profile} />
            </div>
            <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
              <span className="text-md whitespace-nowrap text-gray-50 font-semibold">
                {profile.metadata?.displayName}
              </span>
              <span className="text-md whitespace-nowrap text-gray-100">
                @{profile.handle?.localName}
              </span>
              <p className="text-sm text-gray-200">{profile.metadata?.bio}</p>
              <div className="py-2 flex flex-col">
                {profile.operations.isFollowedByMe.value ? (
                  <UnfollowButton
                    profileId={profile.id}
                    refetch={handleRefetch}
                  />
                ) : (
                  <FollowButton
                    profileId={profile.id}
                    refetch={handleRefetch}
                  />
                )}

                {profile.operations.isFollowingMe.value && (
                  <div className="uppercase font-semibold">follows you</div>
                )}
              </div>
              <div className="py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
                <span className="text-center px-2">
                  <span className="text-gray-100">followers:</span>
                  <span className="font-bold text-gray-50 px-2">
                    {profile.stats.followers}
                  </span>
                </span>
                <span className="text-center px-2">
                  <span className="text-gray-100">following:</span>
                  <span className="font-bold text-gray-50 px-2">
                    {profile.stats.following}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
