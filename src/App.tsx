import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LensLogin } from "./components/wallet";

import { LandingPage, ProfilePage } from "./pages";

import {
  ENV_PROD,
  ENV_DEV,
  IS_PRODUCTION,
  CURRENT_CHAIN_ID,
  CURRENT_CHAIN_NAME,
} from "@/constants";

console.log("is production", IS_PRODUCTION);
console.log("ENV_PROD", ENV_PROD);
console.log("ENV_DEV", ENV_DEV);
console.log("CURRENT_CHAIN_ID", CURRENT_CHAIN_ID);
console.log("CURRENT_CHAIN_NAME", CURRENT_CHAIN_NAME);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile/:handle" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between p-4">
        <LensLogin />
        <ConnectButton />
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
