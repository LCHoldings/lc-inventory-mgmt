import { currentUser } from "@clerk/nextjs/server";
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

export default async function Home() {
  const user = await currentUser()


  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <Card>
        <CardHeader>
          <CardTitle>Home</CardTitle>
        </CardHeader>
        <CardContent>
          { user ? (
            <pre>You are logged in as {user.fullName}</pre>
          ) : (
            <pre>You are not logged in</pre>
          )}
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
                  <DropdownMenuItem key={route.id}>
                    <a href={route.id}>{route.label}</a>
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
