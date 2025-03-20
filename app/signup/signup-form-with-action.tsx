"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signIn } from "next-auth/react";

export function SignupFormWithAction() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreedToTerms) {
      setError("You must agree to the terms of service and privacy policy");
      return;
    }

    if (!role) {
      setError("Please select your role");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      // Auto-login after registration
      await signIn("credentials", { email, password, redirect: false });

      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-white bg-red-500 rounded-md">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm password</Label>
        <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Voice Part / Role</Label>
        <Select value={role} onValueChange={setRole} disabled={isLoading}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select your voice part or role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soprano">Soprano</SelectItem>
            <SelectItem value="alto">Alto</SelectItem>
            <SelectItem value="tenor">Tenor</SelectItem>
            <SelectItem value="bass">Bass</SelectItem>
            <SelectItem value="director">Director</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="user">Other / Not Sure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} disabled={isLoading} />
        <Label htmlFor="terms" className="text-sm font-normal">
          I agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            privacy policy
          </Link>
        </Label>
      </div>

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
