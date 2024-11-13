"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Mail, Lock, LogIn, Eye, EyeOff, Github, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [isLoginLoading, setIsLoginLoading] = useState(false)

    const calculatePasswordStrength = (pass: string) => {
        let strength = 0
        if (pass.length > 6) strength++
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++
        if (pass.match(/\d/)) strength++
        if (pass.match(/[^a-zA-Z\d]/)) strength++
        return strength
    }

    const passwordStrength = calculatePasswordStrength(password)
    const passwordStrengthText =
        ["Weak", "Fair", "Good", "Strong"][passwordStrength - 1] || ""

    const handleLogin = () => {
        setIsLoginLoading(true)
        // Simulate authentication
        setTimeout(() => {
            setIsLoginLoading(false)
            // Handle authentication result
        }, 2000)
    }

    const handleGithubLogin = () => {
        setIsLoginLoading(true)
        // Simulate GitHub authentication
        setTimeout(() => {
            setIsLoginLoading(false)
            // Handle authentication result
        }, 2000)
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
            <Card className="mx-auto max-w-sm w-full transition-all duration-300 hover:shadow-lg">
                <CardHeader className="space-y-1 pb-2">
                    <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center text-sm text-muted-foreground">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-sm text-primary hover:underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="pl-10 pr-10"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {password && (
                            <div className="space-y-2">
                                <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                                    <div
                                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Password strength:{" "}
                                    <span className="font-medium text-primary">
                                        {passwordStrengthText}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                    <Button
                        type="button"
                        className="w-full flex justify-center items-center"
                        onClick={handleLogin}
                        disabled={isLoginLoading}
                    >
                        <span className={`transition-opacity flex flex-row duration-300 ${isLoginLoading ? 'opacity-0' : 'opacity-100'}`}>
                            <LogIn className="mr-2 h-4 w-4 my-auto" />
                            <p>Login</p>
                        </span>
                        {isLoginLoading && (
                            <Loader2 className={`absolute h-4 w-4 animate-spin transition-opacity duration-300 opacity-100 ${isLoginLoading ? 'opacity-100' : 'opacity-0'}`} />
                        )}
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full flex justify-center items-center"
                        onClick={handleGithubLogin}
                        disabled={isLoginLoading}
                    >
                        <span className={`transition-opacity flex flex-row duration-300 ${isLoginLoading ? 'opacity-0' : 'opacity-100'}`}>
                            <Github className="mr-2 my-auto h-4 w-4" />
                            <p>Login with Github</p>
                        </span>
                        {isLoginLoading && (
                            <Loader2 className={`absolute h-4 w-4 animate-spin transition-opacity duration-300 opacity-100 ${isLoginLoading ? 'opacity-100' : 'opacity-0'}`} />
                        )}
                    </Button>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
