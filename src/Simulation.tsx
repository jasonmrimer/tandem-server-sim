import * as React from 'react';
import { SimTable } from './SimTable';
import styled from 'styled-components';
import * as classNames from 'classnames';

interface Props {
  className?: string;
}

export const Simulation = (props: Props) => {
  return (
    <div className={classNames(props.className, 'simulation')}>
    <h2>Simulation by Jason Rimer</h2>
    <SimTable/>
    </div>
  )
}

export const StyledSimulation = styled(Simulation)`
  * {
    box-sizing: border-box;
  }
`;