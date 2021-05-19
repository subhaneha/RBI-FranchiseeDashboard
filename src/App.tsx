import React from 'react';

import './App.css';
import Dashboard from './container/Dashboard/index';
import Header from './components/Header/index';
import WelcomeBK from './components/WelcomeBK/Welcome';
import GradingPageBK from './components/GradingBK/index';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import HowitWorks from './components/HowitWorks';
function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Route exact path="/" component={Dashboard}/>
        <Route  path='/welcomeBK' component={WelcomeBK} />
        <Route  path='/gradingBK' component={GradingPageBK} />
        <Route  path='/HowitWorks' component={HowitWorks} />
      </Router>
   
    </div>
  );
}

export default App;
