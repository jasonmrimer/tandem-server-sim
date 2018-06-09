import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimRow } from './SimRow';
import { ConsumerModel } from './ConsumerModel';

describe('SimRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <SimRow
        index={1}
        consumer={new ConsumerModel(1, 2, 3)}
      />
    )
  });

  it('should render the consumer', () => {
    expect(parseFloat(subject.find('.seed').text())).toBe(1);
    expect(parseFloat(subject.find('.interarrival-time').text())).toBe(2);
    expect(parseFloat(subject.find('.arrival-time').text())).toBe(3);
  });
});