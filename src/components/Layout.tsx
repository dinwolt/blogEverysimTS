import * as React from "react";
import { Link } from "gatsby-plugin-intl";
import Navbar from "./Navbar";
import { useLocation } from "@reach/router";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import { injectIntl, FormattedMessage, IntlShape } from "gatsby-plugin-intl";
import { Helmet } from "react-helmet";

interface LayoutProps {
  title: string;
  style: string;
  children: React.ReactNode;
  intl: IntlShape;
}

const Layout: React.FC<LayoutProps> = ({ title, style, children, intl }) => {
  const location = useLocation();
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

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

  return (
    <>
      {/* Set the HTML language dynamically */}
      <Helmet>
        <html lang={intl.locale} />
      </Helmet>

      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Navbar
          className={`sticky bg-white top-0 transition-all duration-300 z-50`}
        />
        <main className={style}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default injectIntl(Layout);
