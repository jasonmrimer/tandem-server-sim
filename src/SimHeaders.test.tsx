import * as React from 'react';
import { SimHeaders } from './SimHeaders';
import { shallow, ShallowWrapper } from 'enzyme';

describe('SimHeaders', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <SimHeaders/>
    )
  });

  it('should render headers with text', () => {
    expect(subject.find('.header').length).toBe(1);
    expect(subject.find('.header').at(0).text()).toBe('Seed');
  });
});