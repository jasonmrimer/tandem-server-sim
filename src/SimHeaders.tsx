import * as React from 'react';
import styled from 'styled-components';
import * as classNames from 'classnames';

interface Props {
  headers: string[],
  className?: string
}

export const SimHeaders = (props: Props) => {
  return (
    <div className={classNames(props.className, 'sim-headers')}>
      {
        props.headers.map((header, key) => {
          return <span className='header' key={key}>{header}</span>
        })
      }
    </div>
  )
};

export const StyledSimHeaders = styled(SimHeaders)`
  width: 600px;
  display: flex;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 0.5px solid #222;
  text-align: right;
  margin: auto;
  
  span {
    padding: 8px;
    width: 200px;
  }
`;