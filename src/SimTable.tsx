import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';

interface Props {
  className?: string;
}

interface State {
  arrivalClock: number,
  seeds: number[]
}

export class SimTable extends React.Component<Props, State> {
  state = {
    arrivalClock: 0.0,
    seeds: []
  };

  componentDidMount() {
    let arrivalClock = 0.0;
    let seeds: number[] = [];

    while (arrivalClock < 1000) {
      const seed = Math.random();
      const interarrivalTime = (-1) * Math.log(seed);

      arrivalClock += interarrivalTime;
      seeds.push(seed);

    }

    this.setState(
      {
        arrivalClock,
        seeds
      }
    );
  }

  render() {
    return (
      <div>
        <StyledSimHeaders/>
        <StyledSimBody seeds={this.state.seeds}/>
      </div>
    )
  }
}