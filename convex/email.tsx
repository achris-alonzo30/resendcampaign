"use node";

import { Resend } from "resend";
import { v } from "convex/values";
import { internalAction} from "./_generated/server";


export const constructEmail = internalAction({
    args: {
        to: v.string(),
        body: v.string(),
        from: v.string(),
        subject: v.string(),
        resendApiKey: v.string()
    },
    handler: async (_, {
        to,
        body,
        from,
        subject,
        resendApiKey
    }) => {
        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html: body
        });

        if (error) throw new Error("Failed to send email");

        return data;
    }
})