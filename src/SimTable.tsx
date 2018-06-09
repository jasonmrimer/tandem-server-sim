import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from './ConsumerModel';
import { HeaderModel } from './HeaderModel';

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
    const headers = [
      new HeaderModel('Seed', 'U(0,1)'),
      new HeaderModel('Interarrival Time', '(min)'),
      new HeaderModel('Arrival Time', '(min)'),
    ];

    return (
      <div>
        <StyledSimHeaders headers={headers}/>
        <StyledSimBody consumers={this.state.consumers}/>
      </div>
    )
  }
}