"use client"

import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const routes = [
  { id: '/dashboard', label: 'Dashboard' },
  { id: '/signin', label: 'Login' },
  { id: '/signup', label: 'Signup' },
];

export default function Home() {
  const router = useRouter();
  const { isLoaded } = useAuth()
  const { user } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  console.log(user)

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <Card>
        <CardHeader>
          <CardTitle>Home</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>ok</pre>
        </CardContent>
        <CardFooter className="gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Pages
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Pages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {routes.map((route) => (
                  <DropdownMenuItem onClick={() => router.push(route.id)} key={route.id}>
                    <a>{route.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div >
  );
}
