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
import {SunIcon, MoonIcon} from "@heroicons/react/24/outline";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import LanguageSwitcher from './LanguageSwitcher';
import { FormattedMessage, injectIntl, IntlShape, WrappedComponentProps } from 'gatsby-plugin-intl';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { useDarkMode } from '../hooks/useDarkMode';
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
        <p>
            <Link

                to={href || "/"}
                className="flex items-center gap-1 text-brandHighlight dark:text-white sm:text-xl hover:text-brandSecondary"
            >
                {children}
            </Link>
        </p>
    );
}


const Navbar: React.FC<NavProps> = ({ className, intl }) => {
    const { theme, toggleTheme } = useDarkMode();
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
            <div className=" p-5 3xl:container sticky 3xl:max-w-screen-lg 3xl:mx-auto  flex items-center justify-between ">
                <div className='flex flex-1 items-center justify-between '>

                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={handleOpen}
                            className="inline-block "
                        >
                            {open ? (
                                <XMarkIcon strokeWidth={2} className="h-6 w-6 text-brandHighlight dark:text-white" />
                            ) : (
                                <Bars3Icon strokeWidth={2} className="h-6 w-6 text-brandHighlight dark:text-white" />
                            )}
                        </button>
                    </div>
                    <div>
                        <Link to="/" className=" ">

                        {theme === "dark" ? (
                            <StaticImage
                                src="../../static/images/navDark.png"
                                className="w-11"
                                alt="Dark Mode Logo"
                            />
                        ) : (
                            <StaticImage
                                src="../../static/images/nav.png"
                                className="w-11"
                                alt="Light Mode Logo"
                            />
                        )}
                    </Link>
                    
                    </div>
                    

                    <div className='lg:hidden'>
                        <LanguageSwitcher />
                    </div>

                    {/**Desktop: navbar-right for large screens */} 
                    <div className="hidden 3xl:hidden lg:flex flex-1 items-center justify-start 3xl:justify-center ml-9 3xl:ml-0  gap-4">
                        <div className="flex items-center gap-6">
                            {NAV_MENU.map(({ name, icon: Icon, href }) => {
                                return (
                                    <NavItem key={name} href={href}>
                                        <FormattedMessage id={name} />
                                    </NavItem>
                                )
                            })}
                            
                        </div>
                    </div>

                </div>

                {/**Desktop: navbar-right for extra-large screens */}            
                <div className="hidden 3xl:flex flex-1 items-center justify-start 3xl:justify-center ml-9 3xl:ml-0  gap-4">
                    <ul className="flex items-center  gap-6">

                        {NAV_MENU.map(({ name, icon: Icon, href }) => {
                            return (
                                <NavItem key={name} href={href}>
                                    <FormattedMessage id={name} />
                                </NavItem>
                            )
                        })}



                    </ul>
                </div>


                {/**Desktop: navbar-leftside for large screens */}        
                <div className="hidden lg:flex flex-1 items-center justify-end gap-4 mx-auto">
                <button
                        onClick={toggleTheme}
                        className=" rounded-md text-lg  dark:text-white"
                    >
                        {theme === "dark" ? <MoonIcon strokeWidth={1} className="w-6 h-6 text-brandHighlight dark:text-white" /> : <SunIcon strokeWidth={1} className="w-6 h-6 text-brandHighlight dark:text-white" />}
                    </button>
                <LanguageSwitcher />    
                    
                    <GatsbyLink
                        to="https://everysim.io/"
                        target="_blank"
                        className=" font-sans text-lg  text-white bg-brandSecondary hover:bg-brandSecondary/80 px-4 py-2 rounded-md"
                    >
                        <FormattedMessage id="nav_button" />
                    </GatsbyLink>


                </div>
            </div>



            {/**Mobile: opened NavBar */}           
            {open && (
                <div className="container mx-auto mt-3 px-5 pt-4 border-t border-gray-200">
                    <ul className="flex flex-col justify-center items-center gap-4">
                        {NAV_MENU.map(({ name, icon: Icon, href }) => (
                            <NavItem key={name} href={href}>
                                <FormattedMessage id={name} />
                            </NavItem>
                        ))}
                        <div className='flex gap-5 mb-5'>
                        <button
                        onClick={toggleTheme}
                        className=" rounded-md text-lg  dark:text-white"
                    >
                        {theme === "dark" ? <MoonIcon strokeWidth={1} className="sm:w-10 sm:h-10 w-6 h-6 text-brandHighlight dark:text-white" /> : <SunIcon strokeWidth={1} className="sm:w-10 sm:h-10 w-6 h-6 text-brandHighlight dark:text-white" />}
                    </button>
                            <GatsbyLink
                                to="https://everysim.io/"
                                target="_blank"
                                className=" text-lg text-white bg-brandSecondary hover:bg-brandSecondary/80 px-4 py-2 rounded-md"
                            >
                                <FormattedMessage id="nav_button" />
                            </GatsbyLink>


                        </div>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default injectIntl(Navbar);