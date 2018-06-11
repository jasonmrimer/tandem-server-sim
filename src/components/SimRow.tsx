import * as React from 'react';
import styled from 'styled-components';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

interface Props {
  index: number;
  consumer: ConsumerModel;
  service: ServiceModel;
  serverTwoService: ServiceModel;
  className?: string;
}

export const SimRow = (props: Props) => {
  return (
    <div className={props.className} id={`${props.index}`}>
      <span className='seed'>{props.consumer.seed.toFixed(8)}</span>
      <span className='interarrival-time'>{props.consumer.interarrivalTime.toFixed(1)}</span>
      <span className='arrival-time'>{props.consumer.arrivalTime.toFixed(1)}</span>
      <span className='wait-time'>{props.consumer.waitTime.toFixed(1)}</span>
      <span className='service-start'>{props.service.startTime.toFixed(1)}</span>
      <span className='service-seed'>{props.service.seed.toFixed(8)}</span>
      <span className='service-time'>{props.service.duration.toFixed(1)}</span>
      <span className='service-end'>{props.service.endTime.toFixed(1)}</span>
      <span className='service-idle'>{props.service.idleTime.toFixed(1)}</span>
      <span className='server-two-start'>{props.serverTwoService.startTime.toFixed(1)}</span>
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