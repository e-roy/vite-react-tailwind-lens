import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@/components/elements/Avatar";
import { ExplorePublication } from "@/generated/graphqlGenerated";
import { Heart, MessagesSquare } from "lucide-react";

interface PublicationItemProps {
  item: ExplorePublication;
  navigate: ReturnType<typeof useNavigate>;
}

export const PublicationItem: React.FC<PublicationItemProps> = React.memo(
  ({ item, navigate }) => {
    const handleProfileClick = () => {
      navigate(`/profile/${item.by.handle?.localName}`);
    };

    return (
      <div className="flex shadow rounded-lg mx-auto border w-full">
        <div className="flex space-x-4 items-start px-4 py-6 w-full">
          <div className="cursor-pointer" onClick={handleProfileClick}>
            <Avatar profile={item.by} size="w-12 h-12" />
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                @{item.by?.handle?.localName}
              </h2>
              <small className="text-sm text-gray-700">{item.createdAt}</small>
            </div>
            <p>{item.by?.metadata?.displayName}</p>

            <p className="text-gray-700 text-sm text-balance whitespace-normal break-all">
              {item.metadata?.content?.toString()}
            </p>

            <div className="flex mt-4 space-x-6">
              <div className="flex text-gray-700 text-sm space-x-2">
                <MessagesSquare className="w-4 h-4 my-auto" />
                <span>{item.stats?.comments}</span>
              </div>
              <div className="flex text-gray-700 text-sm space-x-2">
                <Heart className="w-4 h-4 my-auto" />
                <span>{item.stats?.reactions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
