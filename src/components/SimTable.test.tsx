import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimTable } from './SimTable';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

describe('SimTable', () => {
  let subject: ShallowWrapper

  beforeEach(() => {
    subject = shallow(
      <SimTable
        consumers={[new ConsumerModel(1, 1, 1)]}
        serverOneServices={[new ServiceModel(1, 1, 1)]}
        serverTwoServices={[new ServiceModel(2, 2, 2)]}
      />
    );
  });

  it('should render table headers', () => {
    expect(subject.find(StyledSimHeaders).exists()).toBeTruthy();
  });

  it('should render a table body', () => {
    expect(subject.find(StyledSimBody).exists()).toBeTruthy();
  });
});
