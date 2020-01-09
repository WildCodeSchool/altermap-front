import React from 'react';
import logo from '../Logo/logo-altermap.png';
import './Login.css';

function Login() {
  return (
    <div className="Login">
      <form className="Login__form">
        <img src={logo} className="Login__logo" alt="Logo Altermap" />
        <label htmlFor="email" className="has-float-label">
          <input id="email" className="Login__form--input" type="email" name="email" placeholder="email@example.com" />
          <span>Email</span>
        </label>
        <label htmlFor="password" className="has-float-label">
          <input id="password" type="password" className="Login__form--input" name="password" placeholder="*********" />
          <span>Mot de passe</span>
        </label>
        <button type="submit" className="Login__form--submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
