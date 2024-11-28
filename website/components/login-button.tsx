"use client"

import { Button } from "./ui/button"
import { Loader2, LucideIcon } from 'lucide-react'

import { useState } from "react"

type LoginMethod = 'magic-link' | 'github' | 'apple' | 'passkey'

export default function LoginButton({ id, label, Icon, handleLogin }: { id: string, label: string, Icon: LucideIcon, handleLogin: (id: LoginMethod) => void }) {
    const [isLoading, setIsLoading] = useState<LoginMethod | null>(null)

    return (
        <>
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
        </>
    )
}

