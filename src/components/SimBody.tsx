import * as React from 'react';
import { StyledSimRow } from './SimRow';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

interface Props {
  consumers: ConsumerModel[];
  services: ServiceModel[];
  className?: string;
}

export const SimBody = (props: Props) => {
  const renderRows = (consumers: ConsumerModel[]) => {
    const rows = consumers.map((consumer, index) => {
      return (
        <StyledSimRow
          consumer={consumer}
          service={props.services[index]}
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
  border-right: 1px solid  #222;
  border-left: 1px solid #222;
`;