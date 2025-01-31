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
              className="relative flex justify-center items-center w-10 h-10  rounded-full transition duration-300 ease-in-out"
              onClick={toggleLanguage}
            >
              
              <GlobeAltIcon className="text-brandHighlight"/>
              
            </button>
          );
        }}
      </IntlContextConsumer>
    </div>
  );
};

export default LanguageSwitcher;
