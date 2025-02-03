import React from 'react';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import { StaticImage } from 'gatsby-plugin-image';
import { Link as GLink } from 'gatsby';



const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-brandHighlight font-robotoCondensed px-10 text-2xl py-6 container mx-auto items-end">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div>
          <h3 className="text-brandSecondary 2xl:text-3xl text-lg font-anton mb-4"><FormattedMessage id="footer_socials_title" /></h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><GLink to="https://kr.linkedin.com/company/everysim" target="_blank"><FormattedMessage id="footer_socials_linkedin" /></GLink></li>
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_socials_email" /></li>

          </ul>
        </div>

        <div>
          <h3 className="text-brandSecondary 2xl:text-3xl text-lg font-robotoCondensed font-bold mb-4"><FormattedMessage id="footer_nav_title" /></h3>
          <ul className="space-y-2 flex-col">
            <li><Link to="/" className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_home" /></Link></li>
            <li><Link to="/blog/1" className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_blog" /></Link></li>
            <li><Link to="/authors" className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_about" /></Link></li>
          </ul>
        </div>



        <div>
          <h3 className="text-brandSecondary 2xl:text-3xl text-lg font-anton mb-4"><FormattedMessage id="footer_newsletter_title" /></h3>
          <p className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-roboto mb-4">
            <FormattedMessage id="footer_newsletter_desc" />
          </p>
          <div className="flex flex-col lg:flex-row items-start md:items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 border border-brandPrimary rounded-md text-gray-500 text-sm sm:text-base font-normal font-roboto focus:outline-none"
            />
            <button className="w-full sm:w-auto px-6 py-2 bg-brandSecondary text-white text-sm sm:text-base font-robotoCondensed rounded-md">
              <FormattedMessage id="footer_newsletter_submit" />
            </button>
          </div>
          
        </div>

      </div>
      

    </footer>
  );
};

export default Footer;
