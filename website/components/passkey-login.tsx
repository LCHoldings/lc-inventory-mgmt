"use client"

import { useSession } from "next-auth/react"
import { signIn } from "next-auth/webauthn"
import { Button } from "./ui/button"

export default function Login() {
    const { data: session, update, status } = useSession()
    return (
        <div>
            {status === "authenticated" ? (
                <Button onClick={() => signIn("passkey", { action: "register" })}>
                    Register new Passkey
                </Button>
            ) : status === "unauthenticated" ? (
                <Button onClick={() => signIn("passkey")}>Sign in with Passkey</Button>
            ) : null}
        </div>
    )
}