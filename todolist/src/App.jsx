import React, { useState } from 'react';
import Juno from './juno';
import Home from './Home';
import './App.css';

function App() {
  const [showJuno, setShowJuno] = useState(true);

  return (
    <div>
      <button onClick={() => setShowJuno(!showJuno)}>
        Toggle View
      </button>
      {showJuno ? <Juno /> : <Home />}
    </div>
  );
}
export default App;