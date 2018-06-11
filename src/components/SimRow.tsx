import * as React from 'react';
import styled from 'styled-components';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

interface Props {
  index: number;
  consumer: ConsumerModel;
  serverOneService: ServiceModel;
  serverTwoService: ServiceModel;
  className?: string;
}

export const SimRow = (props: Props) => {
  const {consumer, serverOneService, serverTwoService} = props;

  return (
    <div className={props.className} id={`${props.index}`}>
      <span className='seed'>{consumer.seed.toFixed(8)}</span>
      <span className='interarrival-time'>{consumer.interarrivalTime.toFixed(1)}</span>
      <span className='arrival-time'>{consumer.arrivalTime.toFixed(1)}</span>
      <span className='wait-for-server-one-time'>{consumer.waitForServerOneTime.toFixed(1)}</span>
      <span className='wait-for-server-two-time'>{consumer.waitForServerTwoTime.toFixed(1)}</span>
      <span className='server-one-idle'>{serverOneService.idleTime.toFixed(1)}</span>
      <span className='server-one-start'>{serverOneService.startTime.toFixed(1)}</span>
      <span className='server-one-seed'>{serverOneService.seed.toFixed(8)}</span>
      <span className='server-one-duration'>{serverOneService.duration.toFixed(1)}</span>
      <span className='server-one-end'>{serverOneService.endTime.toFixed(1)}</span>
      <span className='server-two-idle'>{serverTwoService.idleTime.toFixed(1)}</span>
      <span className='server-two-start'>{serverTwoService.startTime.toFixed(1)}</span>
      <span className='server-two-seed'>{serverTwoService.seed.toFixed(8)}</span>
      <span className='server-two-duration'>{serverTwoService.duration.toFixed(1)}</span>
      <span className='server-two-end'>{serverTwoService.endTime.toFixed(1)}</span>
    </div>
  );
}

export const StyledSimRow = styled(SimRow)`
  width: fit-content;
  display: flex;
  
  span {
    width: 120px;
    text-align: right;
    border-bottom: 1px solid #222;
    border-right: 1px solid #222;
    padding: 4px 4px 0px 4px;
  }
  
  span:first-child {
    border-right: 1px solid #222;
    border-left: none;
  }
  
  span:last-child {
    border-right: none;
  }
`;