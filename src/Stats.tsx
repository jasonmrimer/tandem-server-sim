import * as React from 'react';
import styled from 'styled-components';
import { ServerService } from './services/ServerService';

interface Props {
  serverService: ServerService;
  className?: string;
}

export const Stats = (props: Props) => {
  return (
    <div className={props.className}>
      <h2>Simulation by Jason Rimer</h2>
      <h3>Stats Table</h3>
      <div className='utilization'>
        <span>Server utilization:</span>
        <span>{(props.serverService.utilization * 100).toFixed(2)}%</span>
      </div>
    </div>
  )
};

export const StyledStats = styled(Stats)`
  span {
    padding: 4px;
  }
`;