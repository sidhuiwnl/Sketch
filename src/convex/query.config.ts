import {preloadQuery} from "convex/nextjs";
import {convexAuthNextjsToken} from "@convex-dev/auth/nextjs/server";
import {api} from "../../convex/_generated/api";
import {normalizeProfile,ConvexUserRow} from "@/types/user";
import {Id} from "../../convex/_generated/dataModel";

export const ProfileQuery = async () => {
    return await preloadQuery(
        api.user.getCurrentUser,
        {},
        {
            token : await convexAuthNextjsToken()
        }
    )
}

export const SubscriptionEntitlementQuery = async () => {
    const rawProfile = await ProfileQuery();

    const profile = normalizeProfile(
        rawProfile._valueJSON as unknown as ConvexUserRow | null
    )

    const entitlement = await preloadQuery(
        api.subscription.hasEntitleMent,
        {
            userId : profile?.id as Id<'users'>
        },
        {
            token : await convexAuthNextjsToken()
        }
    )

    return {
        entitlement,
        profileName : profile?.name,
    }
}