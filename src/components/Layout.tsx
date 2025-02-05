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
  children: React.ReactNode;
  intl: IntlShape;
  seoprops:SeoProps;
}

type SeoProps = {
  enUS: {
    title: string;
    description: string;
    url: string;
    author: string;
    keywords: string[];
},
koKR: {
  title: string;
  description: string;
  url: string;
  author: string;
  keywords: string[];
}};

const Layout: React.FC<LayoutProps> = ({ title, children, intl, seoprops }) => {
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
        <title>{intl.locale ==="ko-KR" ? seoprops.koKR.title : seoprops.enUS.title}</title>
        <meta name="description" content={intl.locale ==="ko-KR" ? seoprops.koKR.description : seoprops.enUS.description} />
        <meta name="author" content={intl.locale ==="ko-KR" ? seoprops.koKR.author : seoprops.enUS.author} />
        <meta name="url" content={intl.locale ==="ko-KR" ? seoprops.koKR.url : seoprops.enUS.url} />

        <meta name="keywords" content={intl.locale ==="ko-KR" ? seoprops.koKR.keywords.join(", ") : seoprops.enUS.keywords.join(", ")} />
        <meta property="og:title" content={intl.locale ==="ko-KR" ? seoprops.koKR.title : seoprops.enUS.title} />
        <meta property="og:description" content={intl.locale ==="ko-KR" ? seoprops.koKR.description : seoprops.enUS.description} />
        <meta property="og:url" content={intl.locale ==="ko-KR" ? seoprops.koKR.url : seoprops.enUS.url} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Navbar
          className={`sticky bg-white top-0 transition-all duration-300 z-50`}
        />
        <main >{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default injectIntl(Layout);
