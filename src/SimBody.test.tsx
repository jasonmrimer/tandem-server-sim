import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimBody } from './SimBody';
import { SimRow } from './SimRow';

describe('SimBody', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <SimBody/>
    )
  });

  it('should render rows until it reaches 1000 minutes of arrivals', () => {
    expect(subject.state('arrivalClock')).toBeGreaterThan(1000);
    expect(subject.find(SimRow).length).toBeGreaterThan(1);
  });
});
