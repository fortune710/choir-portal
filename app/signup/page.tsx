import Link from "next/link";
import type { Metadata } from "next";
// import { signIn } from "next-auth/react"; // ✅ Import signIn

// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayout } from "@/components/auth-layout";
import { SignupFormWithAction } from "./signup-form-with-action";
import { OAuthButtons } from "../components/auth/OAuthButtons";

export const metadata: Metadata = {
  title: "Sign Up | Choir Portal",
  description: "Create a new Choir Portal account",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create a Choir Portal account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignupFormWithAction />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* ✅ Move Buttons to a Client Component */}
          <OAuthButtons />
        </CardContent>
        <CardFooter className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">Login</Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}


