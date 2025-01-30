import { KeyRound } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginCardWrapper({ children }: { children: React.ReactNode }) {
    return (

        <Card className="mx-auto max-w-sm w-full transition-all duration-300 hover:shadow-lg">
            <CardHeader className="space-y-1 pb-2 flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-3 mb-2">
                    <KeyRound className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground">
                    Choose your preferred login method
                </CardDescription>
            </CardHeader>
            {children}
        </Card>
    )
}