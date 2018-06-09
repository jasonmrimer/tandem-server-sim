import * as React from 'react';
import { StyledSimRow } from './SimRow';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { ConsumerModel } from './ConsumerModel';

interface Props {
  consumers: ConsumerModel[];
  className?: string;
}

export const SimBody = (props: Props) => {
  const renderRows = (consumers: ConsumerModel[]) => {
    const rows = consumers.map((consumer, index) => {
      return (
        <StyledSimRow
          consumer={consumer}
          index={index}
          key={index}
        />);
    });

    return (rows)
  };

  return (
    <div className={classNames(props.className, 'sim-body')}>
      {renderRows(props.consumers)}
    </div>
  )
}

export const StyledSimBody = styled(SimBody)`
  width: 600px;
  border-right: solid 1px #222;
  border-left: solid 1px #222;
  margin: auto;
`;