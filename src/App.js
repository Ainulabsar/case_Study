import React from 'react';
import logo from './logo.svg';
import './App.css';
import NewProducts from './Components/newProducts';
import Whatsnew from './Components/whatsnew';
import LatestActivity from './Components/latestActivity';
import ProectSummary from './Components/ProgressSummary';
import SummaryWidjet from './Components/SummaryWidget';

function App() {
  return (
    <div className="App">
      <NewProducts />
      <div className="row-container">
        <Whatsnew />
        <LatestActivity />
        <SummaryWidjet />
      </div>
      <ProectSummary />
    </div>
  );
}

export default App;
