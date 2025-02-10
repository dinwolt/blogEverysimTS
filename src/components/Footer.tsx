import React, { useState, useEffect } from 'react';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import { Link as GLink } from 'gatsby';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const res = await fetch("https://blog.everysim.io/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSuccess(true);
      setEmail(""); 
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else {
      setFailure(true);
      setEmail(""); 
      setTimeout(() => {
        setFailure(false);
      }, 2000);
    }
  };

  return (
    <footer className="bg-footer-bg dark:bg-[#1b272d] text-white font-robotoCondensed px-10 text-xl py-6 container mx-auto items-end">
      <div className="mx-auto p-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-brandSecondary dark:text-white 2xl:text-2xl text-lg font-spoqa font-bold mb-4"><FormattedMessage id="footer_socials_title" /></h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary dark:text-white 2xl:text-xl text-sm font-medium font-roboto"><GLink to="https://kr.linkedin.com/company/everysim"><FormattedMessage id="footer_socials_linkedin" /></GLink></li>
            <li className="text-brandSecondary dark:text-white 2xl:text-xl text-sm font-medium font-roboto"><FormattedMessage id="footer_socials_email" /></li>
          </ul>
        </div>

        <div>
          <h3 className="text-brandSecondary dark:text-white 2xl:text-2xl text-lg font-spoqa font-bold font-bold mb-4"><FormattedMessage id="footer_nav_title" /></h3>
          <ul className="space-y-2">
            <li className="text-brandSecondary dark:text-white 2xl:text-xl text-sm font-medium font-roboto"><Link to="/"><FormattedMessage id="footer_home" /></Link></li>
            <li className="text-brandSecondary dark:text-white 2xl:text-xl text-sm font-medium font-roboto"><Link to="/blog/1"><FormattedMessage id="footer_blog" /></Link></li>
            <li className="text-brandSecondary dark:text-white 2xl:text-xl text-sm font-medium font-roboto"><Link to="/authors"><FormattedMessage id="footer_about" /></Link></li>
          </ul>
        </div>

        <div className='flex-col'>
          <h3 className="text-brandSecondary dark:text-white 2xl:text-xl text-lg font-spoqa font-bold mb-4"><FormattedMessage id="footer_newsletter_title" /></h3>
          <p className="text-brandSecondary dark:text-white 2xl:text-xl text-sm font-medium font-roboto mb-4">
            <FormattedMessage id="footer_newsletter_desc" />
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
            <form onSubmit={handleSubscribe}>
              <input
                id="email" 
                type="email"
                placeholder="Enter your email"
                className="w-auto md:px-4 md:py-2 px-2 py-1 border border-gray-300 dark:bg-transparent dark:border-brandHighlight rounded-md text-gray-500 text-xs sm:text-sm font-normal font-roboto focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button
                type="submit"
                className="w-auto md:px-6 md:py-2 px-4 py-1 bg-brandSecondary text-white text-xs sm:text-sm font-roboto rounded-md"
              >
                <FormattedMessage id="footer_newsletter_submit" />
              </button>
            </form>
          </div>
          {success && <p className='text-[#003805] bg-[#9feaa7] text-xs font-sans rounded-sm mt-2 p-1 text-center w-16'>Done</p>}
          {failure && <p className='text-[#7a0000] bg-[#ff8e8e] text-xs font-sans rounded-sm mt-2 p-1 text-center w-28'>Failed. Try Later</p>}
        </div>
      </div>
      <div className='text-xs text-gray-400 sm:text-right p-2'>© 2025 EverySim Blog. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
