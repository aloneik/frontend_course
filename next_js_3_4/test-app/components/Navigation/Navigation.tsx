"use client"

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
    label: string;
    href: string;
}

type NavigationProps = {
    navLinks: NavLink[];
};

export function Navigation({ navLinks }: NavigationProps) {
    const pathname = usePathname();
    const session = useSession();

    return (
        <>
            {navLinks.map(link => {
                    const isActive = pathname == link.href;

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={"nav-link" + (isActive ? " active-tab" : "")}
                        >
                            {link.label}
                        </Link>
                    );
            })}
            {session?.data && <Link className="nav-link" href="/profile">Profile</Link>}
            {session?.data
                ? <Link className="signOut-link"
                    href="#"
                    onClick={() => signOut({
                        callbackUrl: "/"
                    })}>
                  Sign Out
                  </Link>
                : <Link  className="signIn-link" href="/signin">Sign In</Link>
            }
        </>
    )
}