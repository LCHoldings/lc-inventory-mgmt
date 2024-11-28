import { signinErrors } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function LoginError({ error }: { error: string }) {
    return (
        <Card className="mx-auto max-w-sm w-full transition-all duration-300 hover:shadow-lg">
            <CardContent className="flex items-center space-x-4 p-4">
                <div className="flex-shrink-0">
                    <div className="rounded-full bg-destructive/30 p-2">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                </div>
                <div className="flex-grow">
                    <CardTitle className="text-lg font-semibold text-foreground">{error}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {signinErrors[error as keyof typeof signinErrors] || signinErrors.default}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}