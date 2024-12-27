import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface AuthProvidersProps {
    useAuthProvider: (provider: "google" | "github") => void
}
export const AuthProviders = ({ useAuthProvider }: AuthProvidersProps) => {
    return (
        <>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or
                </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <Button 
                    type="button"
                    variant="outline" 
                    className="w-full shrink-0"
                    onClick={() => useAuthProvider("github")}
                >
                    <FaGithub className="size-8" />
                    Continue with Github
                </Button>
                <Button 
                    type="button"
                    variant="outline" 
                    className="w-full shrink-0"
                    onClick={() => useAuthProvider("google")}
                >
                    <FaGoogle className="size-8" /> 
                    Continue with Google
                </Button>
            </div>
        </>
    )
}