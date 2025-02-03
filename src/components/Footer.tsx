import React from 'react';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import { StaticImage } from 'gatsby-plugin-image';


const Footer: React.FC = () => {
  return (
    <footer className="bg-footer-bg text-brandHighlight font-robotoCondensed px-10 text-2xl py-6 container mx-auto items-end">
      <div className="mx-auto p-2 grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div>
          <h3 className="text-brandSecondary 2xl:text-3xl text-lg font-anton mb-4"><FormattedMessage id="footer_socials_title" /></h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_socials_linkedin" /></li>
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_socials_email" /></li>

          </ul>
        </div>

        <div>
          <h3 className="text-brandSecondary 2xl:text-3xl text-lg font-robotoCondensed font-bold mb-4"><FormattedMessage id="footer_nav_title" /></h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_home" /></li>
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_blog" /></li>
            <li className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-robotoCondensed"><FormattedMessage id="footer_about" /></li>
          </ul>
        </div>



        <div className='flex-col'>
          <h3 className="text-brandSecondary 2xl:text-3xl text-lg font-anton mb-4"><FormattedMessage id="footer_newsletter_title" /></h3>
          <p className="text-brandSecondary 2xl:text-2xl text-sm font-medium font-roboto mb-4">
            <FormattedMessage id="footer_newsletter_desc" />
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-auto md:px-4 md:py-2 px-2 py-1 border border-gray-300 rounded-md text-gray-500 text-xs sm:text-sm font-normal font-roboto focus:outline-none"
            />
            <button className="w-auto md:px-6 md:py-2 px-4 py-1 bg-brandSecondary text-white text-xs sm:text-sm font-robotoCondensed rounded-md">
              <FormattedMessage id="footer_newsletter_submit" />
            </button>
          </div>
          
        </div>

      </div>
      <div className="mt-8 flex sm:justify-start justify-center ">
            <div className="h-[10%]">
              
            </div>
          </div>

    </footer>
  );
};

export default Footer;
