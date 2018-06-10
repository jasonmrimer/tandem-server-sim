import * as React from 'react';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { HeaderModel } from './HeaderModel';

interface Props {
  headers: HeaderModel[],
  className?: string
}

export const SimHeaders = (props: Props) => {
  return (
    <div className={classNames(props.className, 'sim-headers')}>
      {
        props.headers.map((header, key) => {
          return (
            <div className='header' key={key}>
              <div className='title'>{header.title}</div>
              <div className='unit-of-measure'>{header.unitOfMeasure}</div>
            </div>
          )
        })
      }
    </div>
  )
};

export const StyledSimHeaders = styled(SimHeaders)`
  display: flex;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 0.5px solid #222;
  text-align: right;
  
  .header {
    padding: 8px;
    width: 200px;
    
    .unit-of-measure {
      font-size: 16px;
      font-weight: 400;
    }
  }
`;