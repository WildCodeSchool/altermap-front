import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import logo from '../Logo/logo-altermap.png';
import './Login.css';


function Login({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState();
  return (
    <div className="Login">
      {auth && <Redirect to="/" />}
      <form
        className="Login__form"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post('/api/v1/login', { email, password })
            .then((res) => {
              localStorage.setItem('altermap-token', res.data.token);
              setIsAuth(true);
              setAuth(true);
            })
            .catch(() => {
              setError(true);
              setTimeout(() => setError(false), 3000);
            });
        }}
      >
        <img src={logo} className="Login__logo" alt="Logo Altermap" />
        <label htmlFor="email" className="Login__form--label">
          <span>Email</span>
          <input
            id="email"
            type="email"
            className="Login__form--input"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label htmlFor="password" className="Login__form--label">
          <span>Mot de passe</span>
          <input
            id="password"
            type="password"
            className="Login__form--input"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button
          type="submit"
          className={
            !(email !== '' && password !== '')
              ? 'Login__form--submit disable'
              : 'Login__form--submit'
          }
          disabled={!(email !== '' && password !== '')}
        >
          Se connecter
        </button>
      </form>
      <div id="snackbar" className={error ? 'show' : ''}>
        Vos informations sont incorrectes
      </div>
    </div>
  );
}

export default Login;
