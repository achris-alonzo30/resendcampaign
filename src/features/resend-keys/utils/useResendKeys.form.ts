import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResendKeysSchema } from "../schema/ResendKeys.schema";


export function useResendKeysForm() {
    return useForm<z.infer<typeof ResendKeysSchema>>({
        resolver: zodResolver(ResendKeysSchema),
        defaultValues: {
            resendApiKey: "",
            resendDomain: "",
        },
    });
}