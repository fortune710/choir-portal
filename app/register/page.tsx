"use client"
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { register } from '@/actions/members'
import { toast } from 'sonner'

export default function RegisterPage() {


  async function handleSubmit(formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')?.toString() ?? "";
    const password = formData.get('password')?.toString() ?? "";
    const confirmPassword = formData.get('confirmPassword')

    console.log(name, email, password, confirmPassword)
    const { success } = await register(email, password)

    if (success) {
      toast.success("Registration Successful")
    } else {
      toast.error("Error While Registering")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Image src="/jhdc-logo.png" alt="Logo" width={70} height={70} className="mx-auto"/>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Choose a password" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">Register</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}