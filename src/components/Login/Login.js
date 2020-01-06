import React from 'react';
import logo from '../Logo/logo-altermap.png';
import './Login.css';

function Login() {
  return (
    <div id="Login">
      <form className="Login__form">
        <img src={logo} className="Login__logo" alt="Logo Altermap" />
        <div className="has-float-label">
          <input id="email" className="Login__form--input" type="email" name="email" placeholder="email@example.com" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="has-float-label">
          <input id="password" type="password" className="Login__form--input" name="password" placeholder="*********" />
          <label htmlFor="password">Mot de passe</label>
        </div>
        <button type="submit" className="Login__form--submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
