import { getFooterCopy, getFullYear } from "../utils/utils";
import React, { useContext } from "react";
import { AppContext } from "../App/AppContext";

function Footer() {
  const { user } = useContext(AppContext); // Destructure user from context

  const footerText = user.isLoggedIn ? (
    <a href="#">Contact us</a>
  ) : (
    `Copyright ${getFullYear()} - ${getFooterCopy(false)}`
  );

  return (
    <div>
      <p>{footerText}</p>
    </div>
  );
}

export default Footer;
