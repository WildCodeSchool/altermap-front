import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import ConstructionSiteForm from './components/ConstructionSiteForm/ConstructionSiteForm';
import Administrator from './components/Admin/Administrator';

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage['altermap-token']);
  const [shouldDisplayWaterLayer, setShouldDisplayWaterLayer] = useState(false);
  const [shouldDisplayLimitsLayer, setShouldDisplayLimitsLayer] = useState(false);
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
  const waterLayerStatus = () => setShouldDisplayWaterLayer(!shouldDisplayWaterLayer);
  const limitsLayerStatus = () => setShouldDisplayLimitsLayer(!shouldDisplayLimitsLayer);
  const disconnect = () => {
    localStorage.removeItem('altermap-token');
    localStorage.removeItem('altermap-role');
    setIsAuth(false);
  };

  if (localStorage['altermap-token'] || isAuth) {
    const token = localStorage.getItem('altermap-token');
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    axios.interceptors.response.use((response) => response, (error) => Promise.reject(
      error.response.status === 401 ? disconnect() : console.log(error),
    ));
  }

  return (
    <div className="App">
      {!isAuth && <Redirect to="/login" />}
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
              displayWaterLayer={shouldDisplayWaterLayer}
              displayLimitsLayer={shouldDisplayLimitsLayer}
              waterLayerStatus={waterLayerStatus}
              limitsLayerStatus={limitsLayerStatus}
            />
            <NavBar close={closeInfo} />
              {isFormOpen && <ConstructionSiteForm close={closeForm} />}
              {isInfoOpen && (<Info close={closeInfo} />)}
          </Route>
          )}
        <Route path="/login">
          <Login setIsAuth={setIsAuth} />
        </Route>
        <Route path="/admin">
          {
            Number(localStorage.getItem('altermap-role')) === 3 ? (
              <Administrator />
            )
              : (<Redirect to={localStorage.getItem('altermap-token') ? '/' : '/login'} />)
          }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
