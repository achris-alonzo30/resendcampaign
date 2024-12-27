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
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddResendKeys } from "../api/useAddResendKeys";


interface ResendKeysFormProps {
  className?: string;

}

export const ResendKeysForms = ({
  className,
}: ResendKeysFormProps) => {
  const router = useRouter();
  const form = useResendKeysForm();
  const { mutate } = useAddResendKeys();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof ResendKeysSchema>) => {
    try {
      await mutate({
        resendApiKey: data.resendApiKey,
        resendDomain: data.resendDomain,
      }, {
        onSuccess: () => {
          form.reset();
          toast.success("Resend keys added successfully");
          router.push("/dashboard");
        },
        onError: () => {
          toast.error("Invalid Resend API Key");
        }
      })
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
              <p className="text-muted-foreground text-balance text-sm text-center font-normal">To continue you must have a <Link href="https://resend.com/emails" className="underline underline-offset-4 text-[#2e90fa] font-bold hover:text-[#2e90fa]/80">Resend</Link> account and add your details to continue</p>
            </div>

            {/* Login Form */}
            <div className="flex flex-col gap-6">
              {/* Add a text button before they are able to submit */}
              <FormField
                control={form.control}
                name="resendApiKey"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel>Resend API Key</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        autoFocus
                        type="password"
                        placeholder="re_123456789"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="resendDomain"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel>Resend Domain</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        autoFocus
                        placeholder="support@resend.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                Verify to continue
              </Button>
            </div>
          </div>
        </form>
        <p className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Your Resend details will be securely stored and used only for sending your emails.
        </p>
      </Form>
    </div>
  )
}
