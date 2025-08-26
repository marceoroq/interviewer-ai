"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth.actions";

export const SignoutButton = () => {
  const handleClick = async () => {
    try {
      await signOutAction();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <Button className="cursor-pointer px-4" variant="destructive" onClick={handleClick}>
      Sign out
    </Button>
  );
};
