import { Navigation } from "./Navigation/Navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Users", href: "/users" },
    { label: "About", href: "/about" },
]

export default function Header() {
    return (
        <header className="fixed-header">
            <div className="container nav">
                <Navigation navLinks={navItems}/>
            </div>
        </header>
    )
}
