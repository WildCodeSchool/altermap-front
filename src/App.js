import React, { useState, Suspense, lazy } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import ShowTable from './components/ShowTable/ShowTable';

const LazyAdmin = lazy(() => import('./components/Admin/Administrator'))

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
    setIsAuth(false);
  };

  if (localStorage['altermap-token'] || isAuth) {
    const token = localStorage.getItem('altermap-token');
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    axios.interceptors.response.use((response) => response, (error) => Promise.reject(
      error ? disconnect() : console.log(error),
    ));
  }

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {!isAuth && <Redirect to="/login" />}
        <Switch>
          {isAuth // Condition to escape error from authorization
            && (
              <Route exact path="/">
                <Header disconnect={disconnect} setPosition={setPosition} setZoom={setZoom} />
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
                  setPolygonToUpdate={setPolygonToUpdate}
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
              localStorage.length > 0 && Number(jwtDecode(localStorage.getItem('altermap-token')).role) === 3 ? (
                <LazyAdmin />
              )
                : (<Redirect to={localStorage.getItem('altermap-token') ? '/' : '/login'} />)
            }
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
