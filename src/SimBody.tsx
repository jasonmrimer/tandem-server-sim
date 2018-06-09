import * as React from 'react';
import { StyledSimRow } from './SimRow';
import styled from 'styled-components';
import * as classNames from 'classnames';

interface Props {
  seeds: number[];
  className?: string;
}

export const SimBody = (props: Props) => {
  const renderRows = (seeds: number[]) => {
    const rows = seeds.map((index) => {
      return (<StyledSimRow key={index} index={index}/>);
    });

    return (rows)
  }

  return (
    <div className={classNames(props.className, 'sim-body')}>
      {renderRows(props.seeds)}
    </div>
  )
}

export const StyledSimBody = styled(SimBody)`
  width: 200px;
`;