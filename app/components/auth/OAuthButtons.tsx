"use client"; // ✅ This makes it a Client Component

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" onClick={() => signIn("google")}>Google</Button>
      <Button variant="outline" onClick={() => signIn("apple")}>Apple</Button>
    </div>
  );
}
