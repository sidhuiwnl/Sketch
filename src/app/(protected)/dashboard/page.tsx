import {SubscriptionEntitlementQuery} from "@/convex/query.config";
import {redirect} from "next/navigation";
import {combineSlug} from "@/lib/utils";

export default async function Page(){
    const { entitlement,profileName } = await SubscriptionEntitlementQuery()

    if(!entitlement._valueJSON){
        // redirect(`/billing/${combineSlug(profileName!)}`)
        redirect(`/dashboard/${combineSlug(profileName!)}`)
    }

    redirect(`/dashboard/${combineSlug(profileName!)}`)

}