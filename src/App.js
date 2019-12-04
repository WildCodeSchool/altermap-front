import React from "react";
import "./App.css";
import Mapper from "./components/Mapper/Mapper";

function App() {
  return (
    <div className="App">
      <Header />
      <Mapper position={[42.6976, 2.8954]} zoom={8} />
    </div>
  );
}

export default App;
