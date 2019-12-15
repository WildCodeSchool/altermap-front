import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';
import ConstructionSiteForm from './components/ConstructionSiteForm/ConstructionSiteForm';

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tempCoords, setTempCoords] = useState(null);
  const [isSubmit, setIsSubmit] = useState(0);
  const closeForm = () => setIsFormOpen(!isFormOpen);
  const closeInfo = () => setIsInfoOpen(!isInfoOpen);

  return (
    <div className="App">
      {/* Fixed elements */}
      <Header />
      <Mapper
        tempCoords={tempCoords}
        setTempCoords={setTempCoords}
        position={[42.6976, 2.8954]}
        zoom={8}
        close={closeForm}
      />
      {tempCoords ? (
        <ConstructionSiteForm tempCoords={tempCoords} close={closeForm} />
      ) : (
        ''
      )}
      <NavBar close={closeInfo} info={isInfoOpen} />
      {/* Elements to implement into Router */}
      <Switch>
        <Route exact path="/info">
          <Info close={closeInfo} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
