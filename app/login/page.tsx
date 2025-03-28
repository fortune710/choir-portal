"use client";
import * as React from "react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { AuthSchema } from "@/lib/validations/auth";

export default function LoginPage() {
  // State for controlled form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setErrors({}); // Clear previous errors

    try {
      // Validate input using AuthSchema
      AuthSchema.parse({ email, password });

      // If validation passes, proceed with login
      await signIn("credentials", { email, password, redirect: true });
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const formattedErrors: { email?: string; password?: string } = {};

        zodError.forEach((err: any) => {
          if (err.path[0] === 'email') {
            formattedErrors.email = err.message;
          } else if (err.path[0] === 'password') {
            formattedErrors.password = err.message;
          }
        });

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-background">
      <Image src="/jhdc-logo.png" alt="Logo" width={70} height={70} className="mx-auto" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
