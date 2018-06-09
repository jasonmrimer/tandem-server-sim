import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimRow } from './SimRow';

describe('SimRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <SimRow/>
    )
  });

  it('should produce a row with a randomized seed', () => {
    expect(parseFloat(subject.find('.seed').text())).toBeLessThan(1);
    expect(parseFloat(subject.find('.seed').text())).toBeGreaterThanOrEqual(0);
  });
});