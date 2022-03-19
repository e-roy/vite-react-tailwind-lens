import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ConnectWallet, SwitchNetwork } from "@/components/wallet";

import { LandingPage } from "@/pages";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const AppLayout = () => {
  return (
    <div className="h-screen">
      <div className="m-4 flex justify-between">
        <div></div>
        <div className="flex space-between">
          <SwitchNetwork />
          <ConnectWallet />
        </div>
      </div>
      <main className="m-4">
        <Outlet />
      </main>
    </div>
  );
};
