"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ResendKeysSchema } from "../schema/ResendKeys.schema";
import { useResendKeysForm } from "../utils/useResendKeys.form";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


interface ResendKeysFormProps {
  className?: string;

}

export const ResendKeysForms = ({
  className,
}: ResendKeysFormProps) => {
  const router = useRouter();
  const form = useResendKeysForm();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof ResendKeysSchema>) => {
    try {

    } catch (error) {

    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
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
              <p className="text-muted-foreground text-sm">Add your <Link href="https://resend.com/emails" className="underline underline-offset-4 text-[#2e90fa] font-bold hover:text-[#2e90fa]/80">Resend</Link> details to continue</p>
            </div>

            {/* Login Form */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Resend API Key</Label>
                <Input
                  required
                  autoFocus
                  placeholder="re_123456789"

                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Resend Domain</Label>
                <div className="relative">
                  <Input
                    required
                    placeholder="support@resend.com"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Continue
              </Button>
            </div>

          </div>
        </form>
      </Form>
    </div>
  )
}
