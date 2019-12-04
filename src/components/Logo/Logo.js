import React from "react";
import "./Logo.css";
import logo from "./logo-altermap.png";

function Logo() {
  return (
    <div className="Logo">
      <img className="Logo__image" src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
