import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Info from './components/Info/Info';


function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <div className="App">
      <Header />
      <Mapper position={[42.6976, 2.8954]} zoom={8} />
      <NavBar setInfo={setIsInfoOpen} info={isInfoOpen} />
      <Switch>
        <Route exact path="/info">
          <Info setInfo={setIsInfoOpen} info={isInfoOpen} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
