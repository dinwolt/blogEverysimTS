import * as React from "react";
import { Link } from "gatsby";
import Navbar from "./Navbar";
import { useLocation } from "@reach/router";
import { useState, useEffect } from "react";
import Footer from "./Footer";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const location = useLocation();
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {  
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Navbar
        className={`  border-0 sticky  transition-all duration-300 z-50 ${showNavbar ? 'top-10' : 'hidden'}`}
      />
      <main className="mt-20">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
