import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PROFILE } from "@/queries/profile/create-profile";
import { Button } from "@/components/elements";

export const CreateProfile = () => {
  const [submitError, setSubmitError] = useState("");
  const [createProfile, { data, loading, error }] = useMutation(
    CREATE_PROFILE,
    {
      variables: {
        request: { handle: new Date().getTime().toString() },
      },
    }
  );

  if (loading)
    return (
      <div className="text-xl font-bold cursor-pointer">Submitting...</div>
    );
  if (error)
    return (
      <div className="text-xl font-bold cursor-pointer text-red-600">
        Submission error! {error.message}
      </div>
    );

  const handleCreateProfile = async () => {
    setSubmitError("");
    await createProfile();
  };

  return (
    <div className="my-4">
      <Button className="" onClick={() => handleCreateProfile()}>
        Create A New Profile
      </Button>
      {submitError && (
        <div className="text-red-600 text-center text-xl">{submitError}</div>
      )}
    </div>
  );
};
