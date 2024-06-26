import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "./UserContext";

import { ENV_PROD, ENV_DEV } from "@/constants";
import { Header } from "./Header";

export const AppLayout = () => {
  const navagate = useNavigate();

  return (
    <UserProvider>
      <div className="h-screen flex flex-col">
        <Header />

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
