import React from "react";
import { changeLocale, IntlContextConsumer } from "gatsby-plugin-intl";

const languageName = {
  ko: "Korean",
  en: "English",
};

const LanguageSwitcher = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({ languages: intlLanguages, language: currentLocale }) => {
          // Assuming there are only two languages (ko and en)
          const toggleLanguage = () => {
            const nextLocale = currentLocale === "ko-KR" ? "en-US" : "ko-KR"; // Toggle between Korean and English
            changeLocale(nextLocale);
          };

          return (
            <button
              className="relative flex justify-center items-center w-12 h-12  rounded-full transition duration-300 ease-in-out"
              onClick={toggleLanguage}
            >
              {/* Background Image (Earth Globe Icon) */}
              <div
                className="absolute inset-0 bg-cover bg-center rounded-full bg-globe"
                
              ></div>
              
            </button>
          );
        }}
      </IntlContextConsumer>
    </div>
  );
};

export default LanguageSwitcher;
