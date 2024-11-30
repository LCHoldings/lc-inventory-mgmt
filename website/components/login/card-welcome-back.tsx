"use client"

import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { useRouter } from 'next/navigation'


export default function CardWelcomeBack({ name }: { name: string }) {
    const router = useRouter()

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
        router.push('/dashboard')
    }, 2000)

    return (
        <Card className="mx-auto max-w-sm w-full transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex items-center space-x-4 p-4">
                <div className="flex-shrink-0">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
                <div className="flex-grow">
                    <CardTitle className="text-lg font-semibold text-foreground">Welcome back {name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Taking you to your dashboard...
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}