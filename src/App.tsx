import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LensLogin } from "./components/wallet";

import { LandingPage, UserPage } from "./pages";

import { ENV_PROD, ENV_DEV } from "@/constants";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <ConnectButton />
        <LensLogin />
      </header>
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <footer className="text-center h-12 text-md text-stone-100">
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
  );
};
