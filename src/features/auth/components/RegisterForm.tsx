
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthProviders } from "./AuthProviders";
import { AuthFormFooter } from "./AuthFormFooter";

interface RegisterFormProps {
    className?: string;
    setAuthState: (state: "login" | "register") => void;
}

export const RegisterForm = ({
    className,
    setAuthState,
}: RegisterFormProps) => {
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
                            Have an account?{" "}
                            <button onClick={() => setAuthState("login")} className="underline underline-offset-4">
                                Sign in
                            </button>
                        </div>
                    </div>

                    {/* Register Form */}
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="********"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create account
                        </Button>
                    </div>
                    <AuthProviders />
                </div>
            </form>
            <AuthFormFooter />
        </div>
    )
}
