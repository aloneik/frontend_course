import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { StyledButton } from "../StyledButton/StyledButton";

export default function GoogleSignButton() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    return (
        <div>
            <StyledButton $variant="contained" onClick={() => signIn("google", { callbackUrl })}>
                Sing In with Google
            </StyledButton>
        </div>
    );
}