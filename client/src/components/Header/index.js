import React from "react";

import Logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <header>
      <div className="d-flex flex-row justify-content-center">
        <img src={Logo} alt="Wcdanold's" />
        <h1>Ba da ba ba ba im loving it &#119137;</h1>
      </div>
    </header>
  );
};

export default Header;
