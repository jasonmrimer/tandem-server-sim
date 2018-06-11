import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from './ConsumerModel';
import { HeaderModel } from './HeaderModel';
import { ConsumerService } from './ConsumerService';
import styled from 'styled-components';
import { ServerService } from './ServerService';
import { ServiceModel } from './ServiceModel';

interface Props {
  className?: string;
}

interface State {
  consumers: ConsumerModel[],
  services: ServiceModel[]
}

export class SimTable extends React.Component<Props, State> {
  state = {
    consumers: [],
    services: [],
  };


  componentDidMount() {
    let consumerService = new ConsumerService(1000);
    consumerService.hydrate();

    let serverService = new ServerService();
    serverService.hydrate(consumerService.consumers);

    this.setState({
      consumers: consumerService.consumers,
      services: serverService.services
    });
  }

  render() {
    const headers = [
      new HeaderModel('Consumer Seed', 'U(0,1)'),
      new HeaderModel('Interarrival Time', '{-1 * ln(seed)} [minutes]'),
      new HeaderModel('Arrival Time', '[minutes]'),
      new HeaderModel('S1 Start', '[minutes]'),
      new HeaderModel('S1 Seed', 'U(0,1)'),
      new HeaderModel('S1 Service', '{-0.7 * ln(seed)} [minutes]'),
      new HeaderModel('S1 End', '[minutes]'),
      new HeaderModel('S1 Idle', '[minutes]'),
    ];

    return (
      <div className={this.props.className}>
        <StyledSimHeaders headers={headers}/>
        <StyledSimBody
          consumers={this.state.consumers}
          services={this.state.services}
        />
      </div>
    )
  }
}

export const StyledSimTable = styled(SimTable)`
  width: fit-content;
  margin: auto;
`;