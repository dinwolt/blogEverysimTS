import React from 'react';
import { Link } from 'gatsby'
import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";


const NAV_MENU = [
    {
        name: "Home",
        icon: RectangleStackIcon,
        href: "/"
    },
    {
        name: "About",
        icon: UserCircleIcon,
        href: "/about"
    },
    {
        name: "Docs",
        icon: CommandLineIcon,
        href: "/blog"
    },
];
interface NavItemProps {
    children: React.ReactNode;
    href?: string;
}
function NavItem({ children, href }: NavItemProps) {
    return (
        <li>
            <Link
                to={href || "/"}
                className="flex items-center gap-2 font-medium text-gray-900"
            >
                {children}
            </Link>
        </li>
    );
}
const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);
    return (
        <nav className="border-0 sticky top-2 z-50">
    <div className="container mx-auto flex items-center justify-between w-full">
      
        <Link to="/" className="flex-1 text-lg font-bold text-gray-900">Everysim</Link>

       
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            <ul className="flex items-center gap-8">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                    <NavItem key={name} href={href}>
                        <Icon className="h-5 w-5" />
                        {name}
                    </NavItem>
                ))}
            </ul>
        </div>

        
        <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
            <Link to="/signin" className="font-medium text-gray-900 hover:text-blue-500">
                Sign In
            </Link>
            <Link
                to="https://www.material-tailwind.com/blocks"
                target="_blank"
                className="font-medium text-white bg-gray-900 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
                Blocks
            </Link>
        </div>
    </div>

   
    <div className="lg:hidden flex items-center">
        <button
            onClick={handleOpen}
            className="inline-block p-2"
        >
            {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6 text-gray-900" />
            ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6 text-gray-900" />
            )}
        </button>
    </div>

    {open && (
        <div className="container mx-auto mt-3 px-4 pt-4 border-t border-gray-200">
            <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                    <NavItem key={name} href={href}>
                        <Icon className="h-5 w-5" />
                        {name}
                    </NavItem>
                ))}
            </ul>
        </div>
    )}
</nav>
    );
};

export default Navbar;