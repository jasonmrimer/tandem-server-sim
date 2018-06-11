import * as React from 'react';
import { SimHeaders } from './SimHeaders';
import { shallow, ShallowWrapper } from 'enzyme';
import { HeaderModel } from '../models/HeaderModel';

describe('SimHeaders', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    const headers = [
      new HeaderModel('header1', 'unit1'),
      new HeaderModel('header2', 'unit2'),
      new HeaderModel('header3', 'unit3')
    ];

    subject = shallow(
      <SimHeaders
        headers={headers}
      />
    )
  });

  it('should render headers with text', () => {
    expect(subject.find('.header').length).toBe(3);
    expect(subject.find('.header').at(0).find('.title').text()).toBe('header1');
    expect(subject.find('.header').at(0).find('.unit-of-measure').text()).toBe('unit1');
    expect(subject.find('.header').at(1).find('.title').text()).toBe('header2');
    expect(subject.find('.header').at(1).find('.unit-of-measure').text()).toBe('unit2');
    expect(subject.find('.header').at(2).find('.title').text()).toBe('header3');
    expect(subject.find('.header').at(2).find('.unit-of-measure').text()).toBe('unit3');
  });
});