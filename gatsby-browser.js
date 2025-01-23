import "./src/styles/global.css"
import "@fontsource/roboto"; // All weights for Roboto
import "@fontsource/anton"; // Anton
import "@fontsource/roboto-condensed";
import React from "react";
import { IntlProvider } from "gatsby-plugin-intl";
 
export const wrapRootElement = ({ element }) => {
  return <IntlProvider>{element}</IntlProvider>;
};