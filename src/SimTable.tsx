import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from './ConsumerModel';

interface Props {
  className?: string;
}

interface State {
  consumers: ConsumerModel[]
}

export class SimTable extends React.Component<Props, State> {
  state = {
    consumers: []
  };

  componentDidMount() {
    let arrivalClock = 0.0;
    let consumers: ConsumerModel[];
    consumers = [];

    while (arrivalClock < 1000) {
      const seed = Math.random();
      const interarrivalTime = (-1) * Math.log(seed);
      const arrivalTime = arrivalClock + interarrivalTime;

      if (arrivalTime < 1000) {
        consumers.push(new ConsumerModel(seed, interarrivalTime, arrivalTime));
      }

      arrivalClock += interarrivalTime;
    }

    this.setState({consumers});
  }

  render() {
    return (
      <div>
        <StyledSimHeaders headers={['Seed', 'Interarrival Time', 'Arrival Time']}/>
        <StyledSimBody consumers={this.state.consumers}/>
      </div>
    )
  }
}