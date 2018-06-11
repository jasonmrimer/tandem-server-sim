import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from '../models/ConsumerModel';
import { HeaderModel } from '../models/HeaderModel';
import styled from 'styled-components';
import { ServiceModel } from '../models/ServiceModel';

interface Props {
  consumers: ConsumerModel[];
  serverOneServices: ServiceModel[];
  serverTwoServices: ServiceModel[];
  className?: string;
}

export const SimTable = (props: Props) => {
  const headers = [
    new HeaderModel('Consumer Seed', 'U(0,1)'),
    new HeaderModel('Interarrival Time', '{-1 * ln(seed)} [minutes]'),
    new HeaderModel('Arrival Time', '[minutes]'),
    new HeaderModel('Wait For S1', '[minutes]'),
    new HeaderModel('Wait For S2', '[minutes]'),
    new HeaderModel('S1 Idle', '[minutes]'),
    new HeaderModel('S1 Start', '[minutes]'),
    new HeaderModel('S1 Seed', 'U(0,1)'),
    new HeaderModel('S1 Duration', '{-0.7 * ln(seed)} [minutes]'),
    new HeaderModel('S1 End', '[minutes]'),
    new HeaderModel('S2 Idle', '[minutes]'),
    new HeaderModel('S2 Start', '[minutes]'),
    new HeaderModel('S2 Seed', 'U(0,1)'),
    new HeaderModel('S2 Duration', '{-0.9 * ln(seed)} [minutes]'),
    new HeaderModel('S2 End', '[minutes]'),
  ];

  return (
    <div className={props.className}>
      <StyledSimHeaders headers={headers}/>
      <StyledSimBody
        consumers={props.consumers}
        serverOneServices={props.serverOneServices}
        serverTwoServices={props.serverTwoServices}
      />
    </div>
  )
}

export const StyledSimTable = styled(SimTable)`
  width: fit-content;
  margin: auto;
`;