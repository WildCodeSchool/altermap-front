import React from 'react';
import './App.css';
import Mapper from './components/Mapper/Mapper';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Header />
      <Mapper position={[42.6976, 2.8954]} zoom={8} />
      <NavBar />
    </div>
  );
}

export default App;
