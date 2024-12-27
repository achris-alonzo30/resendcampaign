"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsVerified } from "@/hooks/use-is-verified";
import { ResendKeysForms } from "@/features/resend-keys/components/ResendKeysForms";
import Loading from "@/app/loading";
export default function SetupAccountPage() {
    const router = useRouter();
    const { isVerified, isLoading } = useIsVerified();

    useEffect(() => {
        if (isVerified) {
            router.push("/dashboard");
        }
    }, [isVerified, router]);
    if (isLoading) return <Loading />
   
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
         <ResendKeysForms />
      </div>
    </div>
  )
}
