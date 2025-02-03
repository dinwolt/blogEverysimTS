import React from "react";
import { changeLocale, IntlContextConsumer } from "gatsby-plugin-intl";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const LanguageSwitcher = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({  language: currentLocale }) => {

          const toggleLanguage = () => {
            const nextLocale = currentLocale === "ko-KR" ? "en-US" : "ko-KR"; 
            changeLocale(nextLocale);
          };

          return (
            <button
              className="relative flex justify-center items-center sm:w-10 sm:h-10 w-6 h-6 rounded-full transition duration-300 ease-in-out"
              name="switch language"
              onClick={toggleLanguage}
            >
              
              <GlobeAltIcon className="text-brandHighlight hover:text-brandSecondary"/>
              
            </button>
          );
        }}
      </IntlContextConsumer>
    </div>
  );
};

export default LanguageSwitcher;
