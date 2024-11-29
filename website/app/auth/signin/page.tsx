"use client"

import React, { useState, useEffect } from "react"
import { Github, Loader2, Mail, Apple, KeyRound } from 'lucide-react'
import { signIn, useSession, signOut } from 'next-auth/react';
import { signIn as passkeySignIn } from "next-auth/webauthn"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { prisma } from "@/prisma";
import LoginError from "@/components/login/login-error";
import { useRouter } from "next/navigation";
import CardWelcomeBack from "@/components/login/card-welcome-back";
import LoginCardWrapper from "@/components/login/login-card-wrapper";

type LoginMethod = 'magic-link' | 'github' | 'apple' | 'passkey'

const loginMethods = [
  { id: 'github', label: 'Login with GitHub', icon: Github },
  { id: 'apple', label: 'Login with Apple', icon: Apple },
  { id: 'passkey', label: 'Login with Passkey', icon: KeyRound },
] as const

export default function Page() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<LoginMethod | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(errorParam)
    }

    if (session) {
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }, [router, session])

  const handleLogin = async (method: LoginMethod) => {
    setIsLoading(method)
    try {
      if (method === 'magic-link') {
        await signIn('resend', { email })
      } else if (method === 'passkey') {
        await passkeySignIn("passkey")
      } else {
        await signIn(method)
      }
    } catch (error) {
      console.error(`Error during ${method} login:`, error)
    } finally {
      if (method == 'passkey' || method == 'magic-link') {
        setIsLoading(null)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      {error && (
        <LoginError error={error} />
      )}
      {(session && !error) ? (
        <CardWelcomeBack name={session?.user?.name || ""} />
      ) : (
        <LoginCardWrapper>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full flex justify-center items-center relative transition-all duration-500"
              onClick={() => handleLogin('magic-link')}
              disabled={isLoading !== null || !email}
            >
              <span className={`transition-opacity flex flex-row duration-300 ${isLoading === 'magic-link' ? 'opacity-0' : 'opacity-100'}`}>
                <Mail className="mr-2 my-auto h-4 w-4" />
                <p>Send Magic Link</p>
              </span>
              {isLoading === 'magic-link' && (
                <Loader2 className="absolute h-4 w-4 animate-spin" />
              )}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            {loginMethods.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant="outline"
                className="w-full flex justify-center items-center relative"
                onClick={() => handleLogin(id as LoginMethod)}
                disabled={isLoading !== null}
              >
                <span className={`transition-opacity flex flex-row duration-300 ${isLoading === id ? 'opacity-0' : 'opacity-100'}`}>
                  <Icon className="mr-2 my-auto h-4 w-4" />
                  <p>{label}</p>
                </span>
                {isLoading === id && (
                  <Loader2 className="absolute h-4 w-4 animate-spin" />
                )}
              </Button>
            ))}
          </CardContent>
        </LoginCardWrapper>
      )}
      <div className="bottom-4 right-4 absolute">
        <ThemeToggle />
      </div>
    </div>
  )
}