// pages/Publications/index.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "@/queries/explore-publications";

import { ExplorePublication } from "@/generated/graphqlGenerated";
import { PublicationItem } from "./components/PublicationItem";

interface PublicationsData {
  explorePublications: {
    items: ExplorePublication[];
  };
}

export const PublicationsPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<PublicationsData>(
    EXPLORE_PUBLICATIONS,
    {
      variables: {
        request: {
          orderBy: "LATEST",
          limit: "TwentyFive",
        },
      },
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const { explorePublications } = data!;

  return (
    <div className="px-2 max-w-3xl m-auto">
      <h1 className="text-xl font-bold text-center">25 Latest Publications</h1>
      <div className="space-y-2">
        {explorePublications.items.map((item) => (
          <PublicationItem key={item.id} item={item} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};
