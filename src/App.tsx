import * as React from 'react';
import './App.css';
import { StyledSimulation } from './components/Simulation';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <StyledSimulation/>
      </div>
    );
  }
}

export default App;
