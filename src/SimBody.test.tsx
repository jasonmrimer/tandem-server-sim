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

  it('should render 1 row', () => {
    expect(subject.find(SimRow).length).toBe(1);
  });
});
