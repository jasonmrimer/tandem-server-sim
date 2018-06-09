import * as React from 'react';
import { SimHeaders } from './SimHeaders';
import { shallow, ShallowWrapper } from 'enzyme';

describe('SimHeaders', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <SimHeaders
        headers={['header1', 'header2', 'header3']}
      />
    )
  });

  it('should render headers with text', () => {
    expect(subject.find('.header').length).toBe(3);
    expect(subject.find('.header').at(0).text()).toBe('header1');
    expect(subject.find('.header').at(1).text()).toBe('header2');
    expect(subject.find('.header').at(2).text()).toBe('header3');
  });
});