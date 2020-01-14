import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import Layers from './components/Layers/Layers';
import ConstructionSiteForm from './components/ConstructionSiteForm/ConstructionSiteForm';
import Administrator from './components/Admin/Administrator';

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage['altermap-token']);
  const [shouldDisplayLayer, setShouldDisplayLayer] = useState(false);
  const closeForm = () => setIsFormOpen(!isFormOpen);
  const closeInfo = () => {
    setIsVisible(!isVisible);
    if (isInfoOpen) {
      setTimeout(() => {
        setIsInfoOpen(!isInfoOpen);
      }, 450);
    } else {
      setIsInfoOpen(!isInfoOpen);
    }
  };
  const layerStatus = () => setShouldDisplayLayer(!shouldDisplayLayer);
  const disconnect = () => {
    localStorage.removeItem('altermap-token');
    setIsAuth(false);
  };

  if (localStorage['altermap-token'] || isAuth) {
    const token = localStorage.getItem('altermap-token');
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }

  return (
    <div className="App">
      {!localStorage['altermap-token'] && <Redirect to="/login" />}
      <Switch>
        { isAuth // Condition to escape error from authorization
          && (
          <Route exact path="/">
            <Header />
            <Mapper
              position={[42.6976, 2.8954]}
              zoom={8}
              close={closeForm}
              popup={isPopupOpen}
              setPopupStatus={setIsPopupOpen}
              displayLayer={shouldDisplayLayer}
            />
            <NavBar close={closeInfo} />
            <Layers displayLayer={layerStatus} />
              {isFormOpen && <ConstructionSiteForm close={closeForm} />}
              {isInfoOpen && (<Info close={closeInfo} />)}
          </Route>
          )}
        <Route path="/login">
          <Login setIsAuth={setIsAuth} />
        </Route>
        <Route path="/admin">
          <Administrator />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
