import {query} from "./_generated/server";
import { v } from "convex/values";

export const hasEntitleMent = query({
    args : {
        userId : v.id('users')
    },
    handler : async (ctx,{ userId }) => {
        const now = Date.now()
        for await ( const sub of ctx.db
            .query('subscriptions')
            .withIndex('by_userId', (q) => q.eq('userId',userId))
            ){
            const status = String(sub.status || '').toLowerCase()
            const periodOk = sub.currentPeriodEnd == null || sub.currentPeriodEnd > now //currentPeriodEnd is the time subscription end's
            if(status === 'active' && periodOk) return true
        }
        return false
    }
})