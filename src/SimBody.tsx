import * as React from 'react';
import { SimRow } from './SimRow';

interface Props {

}

interface State {
  arrivalClock: number,
  seeds: number[]
}

export class SimBody extends React.Component<Props, State> {
  state = {
    arrivalClock: 0.0,
    seeds: []
  };

  componentDidMount() {
    let arrivalClock = 0.0;

    while (arrivalClock < 1000) {
      const seed = Math.random();
      const interarrivalTime = (-1) * Math.log(seed);
      arrivalClock += interarrivalTime;

      let seeds: number[] = [...this.state.seeds];
      seeds.push(seed);

      this.setState({arrivalClock: arrivalClock, seeds: seeds});
    }
  }

  renderRows() {
    const rows = this.state.seeds.map((index) => {
      return <SimRow key={index}/>;
    });

    return (<div>{rows}</div>;
  }

    render()
    {
      return (
        <div>
          {this.renderRows()}
        </div>
      )
    }
  };