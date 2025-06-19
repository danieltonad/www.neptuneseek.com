import React from "react";
import "./header.scss";
import Logo from "../ui/Logo";

const Header = ({ title = "Neptune", isFixed }) => {
  return (
    <header className={`header ${isFixed ? "fixed" : ""}`}>
      <div className="header-container">
        <h1>
          <Logo size="small" />
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
