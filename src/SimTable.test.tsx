import * as React from 'react';
import { StyledSimHeaders } from './SimHeaders';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimTable } from './SimTable';
import { StyledSimBody } from './SimBody';
import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

describe('SimTable', () => {
  let subject: ShallowWrapper

  beforeEach(() => {
    subject = shallow(
      <SimTable/>
    )
  });

  it('should render table headers', () => {
    expect(subject.find(StyledSimHeaders).exists()).toBeTruthy();
  });

  it('should render a table body', () => {
    expect(subject.find(StyledSimBody).exists()).toBeTruthy();
  });

  it('should hydrate a consumer service and set the state with provided consumers', () => {
    const consumers = (subject.state('consumers')) as ConsumerModel[];
    expect(consumers.length).toBeGreaterThan(1);
    expect(consumers[consumers.length - 1].arrivalTime).toBeLessThanOrEqual(1000);
    expect(subject.find(StyledSimBody).prop('consumers')).toBe(consumers);
  });

  it('should hydrate a server 1 service and set the state with provided server', () => {
    const services = (subject.state('services')) as ServiceModel[];
    expect(services.length).toBeGreaterThan(1);
    expect(services[services.length - 1].startTime).toBeLessThanOrEqual(1000);
    expect(subject.find(StyledSimBody).prop('services')).toBe(services);
  });
});
