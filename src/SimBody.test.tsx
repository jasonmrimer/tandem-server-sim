import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimBody } from './SimBody';
import { StyledSimRow } from './SimRow';
import { ConsumerModel } from './ConsumerModel';

describe('SimBody', () => {
  let subject: ShallowWrapper;
  const consumers = [
    new ConsumerModel(1, 1, 1,),
    new ConsumerModel(2, 2, 2,),
    new ConsumerModel(3, 3, 3,)
  ];

  beforeEach(() => {
    subject = shallow(
      <SimBody consumers={consumers}/>
    )
  });

  it('should render a consumer for each seed', () => {
    expect(subject.find(StyledSimRow).length).toBe(3);
  });
});
