import React from 'react';
import { Link } from 'gatsby';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/blog/1" className="hover:text-gray-400">Blog</Link></li>
            <li><Link to="/company" className="hover:text-gray-400">Company</Link></li>
          </ul>
        </div>

        <div className="flex space-x-6">
          <a href="https://facebook.com" className="hover:text-gray-400">Facebook</a>
          <a href="https://twitter.com" className="hover:text-gray-400">Twitter</a>
          <a href="https://instagram.com" className="hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
