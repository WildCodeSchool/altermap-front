import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import ConstructionSiteForm from './components/ConstructionSiteForm/ConstructionSiteForm';

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closeForm = () => setIsFormOpen(!isFormOpen);
  const closeInfo = () => setIsInfoOpen(!isInfoOpen);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Header />
          <Mapper
            position={[42.6976, 2.8954]}
            zoom={8}
            close={closeForm}
            popup={isPopupOpen}
            popupStatus={setIsPopupOpen}
          />
          {isFormOpen
            ? <ConstructionSiteForm close={closeForm} />
            : ''}
          <NavBar close={closeInfo} info={isInfoOpen} />
          {/* Elements to implement into Router */}
          {isInfoOpen && (<Info close={closeInfo} />)}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
