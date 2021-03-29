import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './container/Dashboard/index';
import Header from './components/Header/index';

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
    </div>
  );
}

export default App;
