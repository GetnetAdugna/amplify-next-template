import { getFetchUserAttr } from "@/utils/utils";
import { SignInComponent } from "../components/SignInComponent";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const user = await getFetchUserAttr()

    if (user) {
        redirect('/')
    }

    return (
        <div>
            <SignInComponent />
        </div>
    )
}