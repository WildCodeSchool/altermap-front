import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
<<<<<<< HEAD
import Info from './components/Info/Info';
=======
>>>>>>> Add control bar on right and border buttons

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <div className="App">
      {/* Fixed elements */}
      <Header />
      <Mapper position={[42.6976, 2.8954]} zoom={8} />
      <NavBar setInfo={setIsInfoOpen} info={isInfoOpen} />
      {/* Elements to implement into Router */}
      <Switch>
        <Route exact path="/info">
          <Info setInfo={setIsInfoOpen} info={isInfoOpen} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
