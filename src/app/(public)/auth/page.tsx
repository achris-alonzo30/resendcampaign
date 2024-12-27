"use client";

import { useState } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function AuthPage() {
  const [authState, setAuthState] = useState<"login" | "register">("login");
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        {authState === "login" ? <LoginForm setAuthState={setAuthState} /> : <RegisterForm setAuthState={setAuthState} />}  
      </div>
    </div>
  )
}
