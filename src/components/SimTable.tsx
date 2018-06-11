import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from '../models/ConsumerModel';
import { HeaderModel } from '../models/HeaderModel';
import styled from 'styled-components';
import { ServiceModel } from '../models/ServiceModel';

interface Props {
  consumers: ConsumerModel[];
  services: ServiceModel[];
  className?: string;
}

export const SimTable = (props: Props) => {
    const headers = [
      new HeaderModel('Consumer Seed', 'U(0,1)'),
      new HeaderModel('Interarrival Time', '{-1 * ln(seed)} [minutes]'),
      new HeaderModel('Arrival Time', '[minutes]'),
      new HeaderModel('Wait Time', '[minutes]'),
      new HeaderModel('S1 Start', '[minutes]'),
      new HeaderModel('S1 Seed', 'U(0,1)'),
      new HeaderModel('S1 Service', '{-0.7 * ln(seed)} [minutes]'),
      new HeaderModel('S1 End', '[minutes]'),
      new HeaderModel('S1 Idle', '[minutes]'),
    ];

    return (
      <div className={props.className}>
        <StyledSimHeaders headers={headers}/>
        <StyledSimBody
          consumers={props.consumers}
          services={props.services}
        />
      </div>
    )
}

export const StyledSimTable = styled(SimTable)`
  width: fit-content;
  margin: auto;
`;