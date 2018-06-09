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
});
