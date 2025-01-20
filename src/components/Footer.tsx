import React from 'react';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import { StaticImage } from 'gatsby-plugin-image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-brandHighlight font-robotoCondensed px-10 text-2xl py-6 flex-col items-end">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-brandSecondary text-3xl font-anton mb-4">Everysim</h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">Home</li>
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">About</li>
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">Blog</li>
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">Authors</li>
          </ul>
        </div>

        <div>
          <h3 className="text-brandSecondary text-3xl font-anton mb-4">Socials</h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">Naver</li>
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">LinkedIn</li>
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">Instagram</li>
            <li className="text-brandSecondary text-2xl font-medium font-robotoCondensed">Facebook</li>
          </ul>
        </div>

        <div>
          <h3 className="text-brandSecondary text-3xl font-anton mb-4">Newsletter</h3>
          <p className="text-brandSecondary text-2xl font-medium font-roboto mb-4">
            Subscribe to our newsletter to stay tuned with our blog’s updates.
          </p>
          <div className="flex flex-col lg:flex-row items-start md:items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 border border-brandPrimary rounded-md text-gray-500 text-base font-normal font-roboto focus:outline-none"
            />
            <button className="w-full sm:w-auto px-6 py-2 bg-brandSecondary text-white text-base font-robotoCondensed rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="h-[10%]">
          <StaticImage
            style={{ height: '10%' }}
            src="../../static/images/EverySim_Landscape.png"
            alt="Logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
