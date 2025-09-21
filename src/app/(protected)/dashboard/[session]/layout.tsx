import {SubscriptionEntitlementQuery} from "@/convex/query.config";
import {redirect} from "next/navigation";
import {combineSlug} from "@/lib/utils";
import Navbar from "@/components/navbar";

type Props = {
    children: React.ReactNode;
}

export default async function SessionLayout({ children } : Props){
    const { profileName,entitlement } = await SubscriptionEntitlementQuery();

    // if(!entitlement._valueJSON){
    //     redirect(`/dashboard/${combineSlug(profileName!)}`);
    // }
    return (
        <div className="grid grid-cols-1">
            <Navbar />
            {children}
        </div>
    )
}