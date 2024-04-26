// App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import { PublicationsPage, ProfilePage, PostPage } from "@/pages";

import { AppLayout } from "@/components/layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<PublicationsPage />} />
        <Route path="/profile/:handle" element={<ProfilePage />} />
        <Route path="/post" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
