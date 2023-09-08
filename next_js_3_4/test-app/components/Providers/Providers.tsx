"use client";

import { SessionProvider} from "next-auth/react";

type ProvidersProp = {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProp) {
    return <SessionProvider>{children}</SessionProvider>;
}