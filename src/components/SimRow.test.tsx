import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SimRow } from './SimRow';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

describe('SimRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    let consumer = new ConsumerModel(1, 2, 3);
    consumer.waitTime = 2;

    let service = new ServiceModel(1, 2, 3);
    service.idleTime = 0;

    let serverTwoService = new ServiceModel(4, 5, 6);
    consumer.waitForServerTwoTime = 4;

    subject = shallow(
      <SimRow
        index={1}
        consumer={consumer}
        serverOneService={service}
        serverTwoService={serverTwoService}
      />
    )
  });

  it('should render the consumer', () => {
    expect(parseFloat(subject.find('.seed').text())).toBe(1);
    expect(parseFloat(subject.find('.interarrival-time').text())).toBe(2);
    expect(parseFloat(subject.find('.arrival-time').text())).toBe(3);
    expect(parseFloat(subject.find('.wait-for-server-one-time').text())).toBe(2);
    expect(parseFloat(subject.find('.wait-for-server-two-time').text())).toBe(4);
  });

  it('should render the serverOneService', () => {
    expect(parseFloat(subject.find('.server-one-start').text())).toBe(1);
    expect(parseFloat(subject.find('.server-one-seed').text())).toBe(2);
    expect(parseFloat(subject.find('.server-one-duration').text())).toBe(3);
    expect(parseFloat(subject.find('.server-one-end').text())).toBe(4);
    expect(parseFloat(subject.find('.server-one-idle').text())).toBe(0);
  });

  it('should render serverOneService from server two', () => {
    expect(parseFloat(subject.find('.server-two-start').text())).toBe(4);
    expect(parseFloat(subject.find('.server-two-seed').text())).toBe(5);
    expect(parseFloat(subject.find('.server-two-duration').text())).toBe(6);
    expect(parseFloat(subject.find('.server-two-end').text())).toBe(10);
  });
});