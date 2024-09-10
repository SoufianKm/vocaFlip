import { getFooterCopy, getFullYear } from "../utils/utils";
import React from "react";
import { AppContext } from "../App/AppContext";

function Footer() {
  /*const context = React.useContext(AppContext);
  const footerText = context.currentUser.isLoggedIn ? (
    <a href="#">Contact us</a>
  ) : (
    `Copyright ${getFullYear()} - ${getFooterCopy(false)}`
  );*/

  const footerText = `Copyright ${getFullYear()} - ${getFooterCopy(false)}`
  ;

  return (
    <>
      <p>{footerText}</p>
    </>
  );
}

export default Footer;
