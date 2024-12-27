import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidEmail } from "../utils/isValidEmail";
import { useAuthActions } from "@convex-dev/auth/react";

import { TriangleAlert, Eye, EyeOff } from "lucide-react";

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
    const router = useRouter();
    const { signIn } = useAuthActions();
    const [account, setAccount] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const useAuthProvider = (provider: "google" | "github") => {
        setPending(true);
        signIn(provider).finally(() => {
            setPending(false)
            router.push("/dashboard")
        });
    }

    const useEmailPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (account.password !== account.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!account.email || !account.password) {
            setError("Please fill in all fields");
            return;
        }

        if (!isValidEmail(account.email)) {
            setError("Please enter a valid email address");
            return;
        }

        setPending(true);
        signIn("password", {
            email: account.email,
            password: account.password,
            flow: "signUp",
        }).catch(() => {
            setError("Invalid Credentials");
            }).finally(() => {
                setPending(false);
                router.push("/setup-account")
            });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <form onSubmit={useEmailPassword}>
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
                        <h1 className="text-xl font-bold">Create your workspace</h1>
                        <div className="text-center text-sm">
                            Have an account?{" "}
                            <button onClick={() => setAuthState("login")} className="underline underline-offset-4">
                                Sign in
                            </button>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div className="flex flex-col gap-6">
                        {!!error && (
                            <span className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                                <TriangleAlert className="size-4 text-destructive" />
                                {error}
                            </span>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                required
                                autoFocus
                                id="email"
                                type="email"
                                disabled={pending}
                                value={account.email}
                                placeholder="alan.turing@example.com"
                                onChange={(e) => setAccount({ ...account, email: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    required
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    disabled={pending}
                                    value={account.password}
                                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    required
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="********"
                                    disabled={pending}
                                    value={account.confirmPassword}
                                    onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="sr-only">
                                        {showConfirmPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={pending}
                        >
                            Create account
                        </Button>
                    </div>
                    <AuthProviders useAuthProvider={useAuthProvider} />
                </div>
            </form>
            <AuthFormFooter />
        </div>
    )
}
