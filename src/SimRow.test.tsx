import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimRow } from './SimRow';
import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

describe('SimRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <SimRow
        index={1}
        consumer={new ConsumerModel(1, 2, 3)}
        service={new ServiceModel(1, 2, 3, 4)}
      />
    )
  });

  it('should render the consumer', () => {
    expect(parseFloat(subject.find('.seed').text())).toBe(1);
    expect(parseFloat(subject.find('.interarrival-time').text())).toBe(2);
    expect(parseFloat(subject.find('.arrival-time').text())).toBe(3);
  });

  it('should render the service', () => {
    expect(parseFloat(subject.find('.service-start').text())).toBe(1);
    expect(parseFloat(subject.find('.service-seed').text())).toBe(2);
    expect(parseFloat(subject.find('.service-time').text())).toBe(3);
    expect(parseFloat(subject.find('.service-end').text())).toBe(4);
  });
});