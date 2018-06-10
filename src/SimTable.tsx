import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from './ConsumerModel';
import { HeaderModel } from './HeaderModel';
import { ConsumerService } from './ConsumerService';
import styled from 'styled-components';

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
    let consumerService = new ConsumerService(1000);
    consumerService.hydrate();

    this.setState({consumers: consumerService.consumers});
  }

  render() {
    const headers = [
      new HeaderModel('Seed', 'U(0,1)'),
      new HeaderModel('Interarrival Time', '(min)'),
      new HeaderModel('Arrival Time', '(min)'),
      new HeaderModel('S1 Start', '(min)'),
    ];

    return (
      <div className={this.props.className}>
        <StyledSimHeaders headers={headers}/>
        <StyledSimBody consumers={this.state.consumers}/>
      </div>
    )
  }
}

export const StyledSimTable = styled(SimTable)`
  width: fit-content;
  margin: auto;
`;