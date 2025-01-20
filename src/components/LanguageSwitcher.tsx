import React from "react";
import { changeLocale, IntlContextConsumer } from "gatsby-plugin-intl";


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
              
              <div
                className="absolute inset-0 bg-cover bg-center rounded-full bg-globe-light"
                
              ></div>
              
            </button>
          );
        }}
      </IntlContextConsumer>
    </div>
  );
};

export default LanguageSwitcher;
