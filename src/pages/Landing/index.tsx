import React from "react";
import {
  Publications,
  CreateProfile,
  GetProfiles,
} from "@/components/examples";

export default function LandingPage() {
  return (
    <div>
      <div>landing page</div>
      <CreateProfile />
      <GetProfiles />
      <Publications />
    </div>
  );
}
