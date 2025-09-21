import { Container } from "@/src/components/ui/Container";
import { Account } from "./components/account";

export default async function page() {
    return (
        <Container>
            <h1 className="font-bold text-2xl my-2">Account</h1>
            <Account />
        </Container>
    )
}