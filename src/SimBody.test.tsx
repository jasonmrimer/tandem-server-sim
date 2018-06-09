import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimBody } from './SimBody';
import { SimRow } from './SimRow';

describe('SimBody', () => {
  let subject: ShallowWrapper;
  const seeds = [0.1, 0.2, 0.3];

  beforeEach(() => {
    subject = shallow(
      <SimBody seeds={seeds}/>
    )
  });

  it('should render a row for each seed', () => {
    expect(subject.find(SimRow).length).toBe(3);
  });
});
