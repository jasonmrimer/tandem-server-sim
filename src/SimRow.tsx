import * as React from 'react';
import styled from 'styled-components';
import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

interface Props {
  index: number;
  consumer: ConsumerModel;
  service: ServiceModel;
  className?: string;
}

export const SimRow = (props: Props) => {
  return (
    <div className={props.className} id={`${props.index}`}>
      <span className='seed'>{props.consumer.seed.toFixed(8)}</span>
      <span className='interarrival-time'>{props.consumer.interarrivalTime.toFixed(1)}</span>
      <span className='arrival-time'>{props.consumer.arrivalTime.toFixed(1)}</span>
      <span className='service-start'>{props.service.startTime.toFixed(1)}</span>
      <span className='service-seed'>{props.service.serviceSeed.toFixed(8)}</span>
      <span className='service-time'>{props.service.serviceTime.toFixed(1)}</span>
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