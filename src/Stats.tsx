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
        <div className='consumers-served'>
          <span>Consumers served before 1000 minutes:</span>
          <span>{props.serverService.consumersServed}</span>
        </div>
        <div className='servers'>
          <div className='server-one'>
            <span>Server 1</span>
            <div className='utilization'>
              <span>Utilization [%]:</span>
              <span>{(props.serverService.serverOneUtilization * 100).toFixed(2)}</span>
            </div>
            <div className='average-wait'>
              <span>Average wait time [minutes]:</span>
              <span>{props.serverService.averageWaitForServerOne.toFixed(1)}</span>
            </div>
            <div className='maximum-wait'>
              <span>Maximum wait time [minutes]:</span>
              <span>{props.serverService.maximumWaitForServerOne.toFixed(1)}</span>
            </div>
          </div>
          <div className='server-two'>
            <span>Server 2</span>
            <div className='utilization'>
              <span>Utilization [%]:</span>
              <span>{(props.serverService.serverTwoUtilization * 100).toFixed(2)}</span>
            </div>
            <div className='average-wait'>
              <span>Average wait time [minutes]:</span>
              <span>{props.serverService.averageWaitForServerTwo.toFixed(1)}</span>
            </div>
            <div className='maximum-wait'>
              <span>Maximum wait time [minutes]:</span>
              <span>{props.serverService.maximumWaitForServerTwo.toFixed(1)}</span>
            </div>
          </div>
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
  }
  
  span {
    padding: 4px 16px 0 16px;
  }
  
  .servers {
    flex-direction: row;
    
    .server-one, .server-two {
      width: 400px;
      flex-direction: column;
      justify-content: space-between;
      
      > span {
        font-weight: 600;
        font-size: 18px;
      }   
      
      div {
        justify-content: space-between;
      }
    }
    
  }
  
  .consumers-served {
    margin: auto;
    margin-bottom: 48px;
    font-weight: 500;
  }
`;