import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimBody } from './SimBody';
import { StyledSimRow } from './SimRow';
import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

describe('SimBody', () => {
  let subject: ShallowWrapper;
  const consumers = [
    new ConsumerModel(1, 1, 1,),
    new ConsumerModel(2, 2, 2,),
    new ConsumerModel(3, 3, 3,)
  ];
  const services = [
    new ServiceModel(1, 1, 1, 1),
    new ServiceModel(2, 2, 2, 2),
    new ServiceModel(3, 3, 3, 3),
  ];

  beforeEach(() => {
    subject = shallow(
      <SimBody
        consumers={consumers}
        services={services}
      />
    )
  });

  it('should render a consumer for each seed', () => {
    expect(subject.find(StyledSimRow).at(0).props()).toEqual(
      {
        consumer: consumers[0],
        service: services[0],
        index: 0
      })
    expect(subject.find(StyledSimRow).length).toBe(3);
  });
});
