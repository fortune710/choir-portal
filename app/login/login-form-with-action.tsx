"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
// import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
     Alert,
    //  AlertDescription
} from "@/components/ui/alert"
// import { CheckCircle2 } from "lucide-react"

export function LoginFormWithAction() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError("Invalid email or password")
      setIsLoading(false)
    } else {
      router.push("/dashboard") // Redirect on success
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert className="bg-red-50 text-red-800">{error}</Alert>}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="name@example.com" disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" disabled={isLoading} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" name="remember" disabled={isLoading} />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
