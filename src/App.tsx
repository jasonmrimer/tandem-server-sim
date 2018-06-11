import * as React from 'react';
import './App.css';
import { StyledSimulation } from './components/Simulation';
import { Route } from 'react-router';
import { StyledStats } from './Stats';
import { ServerService } from './services/ServerService';
import { ConsumerService } from './services/ConsumerService';
import { HashRouter } from 'react-router-dom';

interface Props {
  className?: string;
}

interface State {
  consumerService: ConsumerService;
  serverService: ServerService;
}

class App extends React.Component<Props, State> {
  state = {
    consumerService: new ConsumerService(),
    serverService: new ServerService(),
  };

  componentDidMount() {
    let consumerService = new ConsumerService();
    consumerService.hydrate(1000);

    let serverService = new ServerService();
    serverService.hydrate(consumerService.consumers);

    this.setState({consumerService, serverService});
  }

  public render() {
    let renderSimulation = () => (
      <StyledSimulation
        consumers={this.state.consumerService.consumers}
        services={this.state.serverService.serverOneServices}
        serverTwoServices={this.state.serverService.serverTwoServices}
      />
    );


    let renderStats = () => (
      <StyledStats serverService={this.state.serverService}/>
    );
    return (
      <HashRouter>
        <div className="App">
          <Route exact={true} path="/" render={renderSimulation}/>
          <Route path="/stats" render={renderStats}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
