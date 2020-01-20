import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import ShowTable from './components/ShowTable/ShowTable';
import Administrator from './components/Admin/Administrator';

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage['altermap-token']);
  const [shouldDisplayWaterLayer, setShouldDisplayWaterLayer] = useState(false);
  const [shouldDisplayLimitsLayer, setShouldDisplayLimitsLayer] = useState(false);
  const [polygonToUpdate, setPolygonToUpdate] = useState(null);
  const [tableIsDisplay, setTableIsDisplay] = useState(false);
  const [position, setPosition] = useState([42.6976, 2.8954]);
  const [zoom, setZoom] = useState(8);
  const closeForm = () => setIsFormOpen(!isFormOpen);
  const closeInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };
  const waterLayerStatus = () => setShouldDisplayWaterLayer(!shouldDisplayWaterLayer);
  const limitsLayerStatus = () => setShouldDisplayLimitsLayer(!shouldDisplayLimitsLayer);
  const closeTable = () => setTableIsDisplay(!tableIsDisplay);
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
              position={position}
              zoom={zoom}
              close={closeForm}
              popup={isPopupOpen}
              setPopupStatus={setIsPopupOpen}
              displayWaterLayer={shouldDisplayWaterLayer}
              displayLimitsLayer={shouldDisplayLimitsLayer}
              waterLayerStatus={waterLayerStatus}
              limitsLayerStatus={limitsLayerStatus}
              polygonToUpdate={polygonToUpdate}
            />
            <NavBar close={closeInfo} closeTable={closeTable} />
            <Info close={closeInfo} isInfoOpen={isInfoOpen} />
            <ShowTable
              tableIsDisplay={tableIsDisplay}
              setTableIsDisplay={setTableIsDisplay}
              popup={isPopupOpen}
              setPopupStatus={setIsPopupOpen}
              polygonToUpdate={polygonToUpdate}
              setPolygonToUpdate={setPolygonToUpdate}
              setPosition={setPosition}
              setZoom={setZoom}
            />
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
