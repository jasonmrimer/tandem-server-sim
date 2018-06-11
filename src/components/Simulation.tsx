import * as React from 'react';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { StyledSimTable } from './SimTable';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

interface Props {
  consumers: ConsumerModel[];
  services: ServiceModel[];
  serverTwoServices: ServiceModel[];
  className?: string;
}

export const Simulation = (props: Props) => {
  return (
    <div className={classNames(props.className, 'simulation')}>
      <h2>Simulation by Jason Rimer</h2>
      <h3>Sim Table</h3>
      <StyledSimTable
        consumers={props.consumers}
        services={props.services}
        serverTwoServices={props.serverTwoServices}
      />
    </div>
  )
}

export const StyledSimulation = styled(Simulation)`
  * {
    box-sizing: border-box;
  }
`;