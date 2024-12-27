
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthProviders } from "./AuthProviders";
import { AuthFormFooter } from "./AuthFormFooter";

interface LoginFormProps {
  className?: string;
  setAuthState: (state: "login" | "register") => void;
}

export const LoginForm = ({
  className,
  setAuthState,
}: LoginFormProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <form>
        <div className="flex flex-col gap-6">
          {/* Form Header */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <Image src="/logo.svg" alt="Resender" width={32} height={32} />
              <span className="sr-only">Resender</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Resender</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <button onClick={() => setAuthState("register")} className="underline underline-offset-4">
                Sign up
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <AuthProviders /> 
        </div>
      </form>
      <AuthFormFooter />
    </div>
  )
}
