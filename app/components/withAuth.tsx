'use client'

import { useAuthenticator } from "@aws-amplify/ui-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function withAuth(Component: any) {
    return function withAuth(props: any) {

        const { user } = useAuthenticator();
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.replace('/');
            }
        }, [user, router]);


        return <Component {...props} />
    }
}