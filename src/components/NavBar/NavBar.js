import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar({ close, info }) {
  return (
    <div className="NavBar">
      <Link
        to={info ? "/" : "/info"}
        className="NavBar__info"
        onClick={() => close()}
      >
        <a href="/" className="NavBar__info">
          <Icon icon={faInfo} />
        </a>
      </Link>
    </div>
  );
}

export default NavBar;
