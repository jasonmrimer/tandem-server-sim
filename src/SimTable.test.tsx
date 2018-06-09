import * as React from 'react';
import { SimHeaders } from './SimHeaders';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimTable } from './SimTable';
import { SimBody } from './SimBody';

describe('SimTable', () => {
  let subject: ShallowWrapper

  beforeEach(() => {
    subject = shallow(
      <SimTable/>
    )
  });

  it('should render table headers', () => {
    expect(subject.find(SimHeaders).exists()).toBeTruthy();
  });

  it('should render a table body', () => {
    expect(subject.find(SimBody).exists()).toBeTruthy();
  });

  it('should create seeds until 1000 minutes and send to SimBody', () => {
    const seeds = (subject.state('seeds')) as number[];
    expect(subject.state('arrivalClock')).toBeGreaterThan(1000);
    expect(seeds.length).toBeGreaterThan(1);
    expect(subject.find(SimBody).prop('seeds')).toBe(seeds);
  });
});
