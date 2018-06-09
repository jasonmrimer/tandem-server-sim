import * as React from 'react';
import styled from 'styled-components';

interface Props {
  index: number
  className?: string;
}

export const SimRow = (props: Props) => {
  return (
    <div className={props.className}>
      <span className='seed' id={`${props.index}`}>{Math.random()}</span>
    </div>
  );
}

export const StyledSimRow = styled(SimRow)`
  text-align: right;
  border-bottom: 0.5px solid #222;
  border-left: 0.5px solid #222;
  border-right: 0.5px solid #222;
  padding: 4px 4px 0px 4px;
`;