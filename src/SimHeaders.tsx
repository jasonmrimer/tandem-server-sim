import * as React from 'react';
import styled from 'styled-components';
import * as classNames from 'classnames';

interface Props {
  className?: string
}

export const SimHeaders = (props: Props) => {
  return (
    <div className={classNames(props.className, 'sim-headers')}>
      <span className="header">Seed</span>
    </div>
  )
};

export const StyledSimHeaders = styled(SimHeaders)`
  width: 200px;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 0.5px solid #222;
  text-align: right;
  padding: 8px;
`;