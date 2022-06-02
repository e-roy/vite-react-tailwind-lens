import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "@/queries/explore-publications";

import { Avatar } from "@/components/elements/Avatar";

export const Publications = () => {
  let navigate = useNavigate();
  const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        limit: 20,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold text-center">20 Latest Publications</h1>
      {data && (
        <>
          {data.explorePublications.items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex bg-white shadow-lg rounded-lg mx-4 my-2 md:mx-auto border max-w-md md:max-w-2xl "
            >
              <div className="flex items-start px-4 py-6 w-full">
                <div
                  className="w-16 cursor-pointer"
                  onClick={() => navigate(`/profile/${item.profile.handle}`)}
                >
                  <Avatar profile={item.profile} size={"w-12 h-12"} />
                </div>

                <div className="w-full px-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                      {item.profile.name}
                    </h2>
                    <small className="text-sm text-gray-700">
                      {item.createdAt}
                    </small>
                  </div>
                  <p>@{item.profile.handle}</p>

                  <p className="mt-3 text-gray-700 text-sm">
                    {item.metadata.content}
                  </p>

                  <div className="mt-4 flex items-center">
                    <div className="flex  text-gray-700 text-sm mr-8">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <span>{item.stats.totalAmountOfComments}</span>
                    </div>
                    <div className="flex text-gray-700 text-sm mr-3">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{item.stats.totalAmountOfCollects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
