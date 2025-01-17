import React from 'react';
import { Link } from 'gatsby-plugin-intl';
import { Link as GatsbyLink } from 'gatsby';
import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    XMarkIcon,
    Bars3Icon,

} from "@heroicons/react/24/solid";
import LanguageSwitcher from './LanguageSwitcher';
import { FormattedMessage, injectIntl, IntlShape, WrappedComponentProps } from 'gatsby-plugin-intl';
interface NavbarProps {
    className: string;
    intl: IntlShape;
}


interface NavItemProps {
    children: React.ReactNode;
    href?: string;
}
type NavProps = NavbarProps & WrappedComponentProps;
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
const Navbar: React.FC<NavProps> = ({ className, intl }) => {
    const NAV_MENU = [
        {
            name: "nav_home",
            icon: RectangleStackIcon,
            href: "/"
        },
        {
            name: "nav_blog",
            icon: UserCircleIcon,
            href: "/blog/1"
        },
        {
            name: "nav_about",
            icon: CommandLineIcon,
            href: "/authors"
        },
    ];
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
                <div className='flex flex-1 items-center justify-between '>

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
                    <div className='lg:hidden'>
                        <LanguageSwitcher />
                    </div>

                </div>



                <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
                    <ul className="flex items-center gap-8">
                        {NAV_MENU.map(({ name, icon: Icon, href }) => {
                            console.log(intl.formatMessage({ id: name }))
                            return (
                                <NavItem key={name} href={href}>
                                    <Icon className="h-5 w-5" />
                                    <FormattedMessage id={name} />
                                </NavItem>
                            )
                        })}
                        <LanguageSwitcher />
                    </ul>
                </div>


                <div className="hidden lg:flex flex-1 items-center justify-end gap-4 mx-auto">


                    <GatsbyLink
                        to="https://everysim.io/"
                        target="_blank"
                        className="font-medium text-white bg-brandSecondary hover:bg-gray-700 px-4 py-2 rounded-md"
                    >
                        <FormattedMessage id="nav_button" />
                    </GatsbyLink>
                    <GatsbyLink
                        to="https://kr.linkedin.com/company/everysim"
                        target="_blank"
                        className="font-medium text-white bg-brandSecondary hover:bg-gray-700 px-4 py-2 rounded-md"
                    >
                        LinkedIn
                    </GatsbyLink>

                </div>
            </div>




            {open && (
                <div className="container mx-auto mt-3 px-4 pt-4 border-t border-gray-200">
                    <ul className="flex flex-col gap-4">
                        {NAV_MENU.map(({ name, icon: Icon, href }) => (
                            <NavItem key={name} href={href}>
                                <Icon className="h-5 w-5" />
                                <FormattedMessage id={name} />
                            </NavItem>
                        ))}
                        <div className='flex gap-5'>
                        <GatsbyLink
                        to="https://everysim.io/"
                        target="_blank"
                        className="font-medium text-white bg-brandSecondary hover:bg-gray-700 px-4 py-2 rounded-md"
                    >
                        <FormattedMessage id="nav_button" />
                    </GatsbyLink>
                    <GatsbyLink
                        to="https://kr.linkedin.com/company/everysim"
                        target="_blank"
                        className="font-medium text-white bg-brandSecondary hover:bg-gray-700 px-4 py-2 rounded-md"
                    >
                        LinkedIn
                    </GatsbyLink>

                        </div>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default injectIntl(Navbar);