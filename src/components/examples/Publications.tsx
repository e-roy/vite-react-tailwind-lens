import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "@/queries/explore-publications";

export const Publications = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { loading, error, data } = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "TOP_COMMENTED",
        limit: 20,
      },
    },
  });

  console.log(data);
  return (
    <div className="p-2 border rounded">
      <h1
        className="text-xl font-bold text-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Top 20 Commented Publications
      </h1>
      {isOpen && data && (
        <>
          {data.explorePublications.items.map((item: any, index: number) => (
            <div key={index} className="m-2 p-2 border rounded">
              <div className="font-semibold">Name : {item.metadata.name}</div>
              <div>Content : {item.metadata.content}</div>
              <div>Description : {item.metadata.description}</div>

              <div className="p-4">
                <div className="font-semibold">
                  Username : {item.profile.handle}
                </div>
                <div>Collects : {item.stats.totalAmountOfCollects}</div>
                <div>Comments : {item.stats.totalAmountOfComments}</div>
                <div>Mirrors : {item.stats.totalAmountOfMirrors}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
