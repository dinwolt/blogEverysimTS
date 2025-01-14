import React from 'react';
import { Link } from 'gatsby'

import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    XMarkIcon,
    Bars3Icon,

} from "@heroicons/react/24/solid";
interface NavbarProps {
    className: string;
}

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
                className="flex items-center gap-2 font-medium text-white"
            >
                {children}
            </Link>
        </li>
    );
}
const Navbar: React.FC<NavbarProps> = ({ className }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);
    return (
        <nav className={className}>
            <div className="container max-w-screen-lg mx-auto p-5 flex items-center justify-between w-auto">
                <div className='flex flex-1 items-center '>

                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={handleOpen}
                            className="inline-block p-2"
                        >
                            {open ? (
                                <XMarkIcon strokeWidth={2} className="h-6 w-6 text-white" />
                            ) : (
                                <Bars3Icon strokeWidth={2} className="h-6 w-6 text-white" />
                            )}
                        </button>
                    </div>
                    <Link to="/" className=" text-lg font-bold text-white">Everysim</Link>
                </div>



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


                <div className="hidden lg:flex flex-1 items-center justify-end gap-4 mx-auto">
                    <Link to="/signin" className="font-medium text-white hover:text-blue-500">
                        Sign In
                    </Link>
                    <Link
                        to="https://www.material-tailwind.com/blocks"
                        target="_blank"
                        className="font-medium text-white bg-brandSecondary hover:bg-gray-700 px-4 py-2 rounded-md"
                    >
                        Blocks
                    </Link>
                </div>
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