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
      <span className='interarrival-time'>{props.consumer.interarrivalTime.toFixed(2)}</span>
      <span className='arrival-time'>{props.consumer.arrivalTime.toFixed(2)}</span>
    </div>
  );
}

export const StyledSimRow = styled(SimRow)`
  width: 600px;
  display: flex;
  
  span {
    width: 200px;
    text-align: right;
    border-bottom: 0.5px solid #222;
    border-left: 0.5px solid #222;
    border-right: 0.5px solid #222;
    padding: 4px 4px 0px 4px;
  }
  
  span:first-child, span:last-child {
    border-left: none;
    border-right: none;
  }
`;