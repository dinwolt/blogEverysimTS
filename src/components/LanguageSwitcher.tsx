import React from "react";
import { changeLocale, IntlContextConsumer } from "gatsby-plugin-intl";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
const LanguageSwitcher = () => {
  const [lang, setLang] = useState("");
  return (
    <div>
      <IntlContextConsumer>
        {({  language: currentLocale }) => {
          setLang(currentLocale === "ko-KR" ? "US" : "KR")

          const toggleLanguage = () => {
            const nextLocale = currentLocale === "ko-KR" ? "en-US" : "ko-KR"; 
            changeLocale(nextLocale);
          };

          return (
            <button
              className="relative flex justify-center items-center gap-1 rounded-full transition duration-300 ease-in-out"
              name="switch language"
              onClick={toggleLanguage}
            >
              
              <GlobeAltIcon strokeWidth={1} className="text-brandHighlight dark:text-white hover:text-brandSecondary w-6 h-6"/>
              <div className="text-brandHighlight hidden sm:block dark:text-white sm:text-base font-semibold 3xl:hidden" >{lang}</div>
            </button>
          );
        }}
      </IntlContextConsumer>
    </div>
  );
};

export default LanguageSwitcher;
