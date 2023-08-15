"use client"

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

    return (
        <>
            {
                navLinks.map(link => {
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
                })
            }
        </>
    )
}