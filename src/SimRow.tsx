import * as React from 'react';
import styled from 'styled-components';
import { ConsumerModel } from './ConsumerModel';

interface Props {
  index: number;
  consumer: ConsumerModel;
  className?: string;
}

export const SimRow = (props: Props) => {
  return (
    <div className={props.className} id={`${props.index}`}>
      <span className='seed'>{props.consumer.seed}</span>
      <span className='interarrival-time'>{props.consumer.interarrivalTime.toFixed(1)}</span>
      <span className='arrival-time'>{props.consumer.arrivalTime.toFixed(1)}</span>
      <span className='s1-start'>{props.consumer.arrivalTime.toFixed(1)}</span>
    </div>
  );
}

export const StyledSimRow = styled(SimRow)`
  width: fit-content;
  display: flex;
  
  span {
    width: 200px;
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