import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthWrapper({ children }: { children: React.ReactNode }) {
    const user = await currentUser()

    if (!user) {
        return redirect('/signin')
    }

    return <>{children}</>
}


