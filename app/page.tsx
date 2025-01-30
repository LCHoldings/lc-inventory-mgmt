"use client"

import PasskeyLogin from '@/components/passkey-login';

import { useRouter } from "next/navigation";

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
import { useSession } from 'next-auth/react';
import { ChevronDown } from 'lucide-react';

const routes = [
  { id: '/dashboard', label: 'Dashboard' },
  { id: '/auth/signin', label: 'Login' },
];

export default function Home() {
  const { data:session } = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <Card>
        <CardHeader>
          <CardTitle>Home</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </CardContent>
        <CardFooter className="gap-2">
          <PasskeyLogin />
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
