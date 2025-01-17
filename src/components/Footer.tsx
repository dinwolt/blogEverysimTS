import React from 'react';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-400">
            <FormattedMessage id="footer_home"/>
            </Link></li>
            <li><Link to="/blog/1" className="hover:text-gray-400">
            <FormattedMessage id="footer_blog"/>
            </Link></li>
            <li><Link to="/authors" className="hover:text-gray-400">
            <FormattedMessage id="footer_about"/>
            </Link></li>
          </ul>
        </div>

        <div className="flex space-x-6">
          <a href="https://facebook.com" className="hover:text-gray-400">
          <FormattedMessage id="footer_naver"/>
          </a>
          <a href="https://twitter.com" className="hover:text-gray-400">
          <FormattedMessage id="footer_web"/>
          </a>
          <a href="https://instagram.com" className="hover:text-gray-400">
          <FormattedMessage id="footer_insta"/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
