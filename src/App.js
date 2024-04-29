import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/weatherist'>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
