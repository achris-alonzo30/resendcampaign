
import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const currentUser = query({
    handler: async (ctx, _args) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) return null;
        return await ctx.db.get(userId)
    }
});