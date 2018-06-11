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
      <div className='stats-table'>
        <div className='utilization'>
          <span>Server utilization [%]:</span>
          <span>{(props.serverService.utilization * 100).toFixed(2)}</span>
        </div>
        <div className='average-wait'>
          <span>Average wait time [minutes]:</span>
          <span>{props.serverService.averageWait.toFixed(1)}</span>
        </div>
        <div className='maximum-wait'>
          <span>Maximum wait time [minutes]:</span>
          <span>{props.serverService.maximumWait.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
};

export const StyledStats = styled(Stats)`
  .stats-table {
    width: max-content;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  
  div {
    display: flex;
    justify-content: space-between;
  }
  
  span {
    padding: 4px 16px 0 16px;
  }
`;