import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Stats } from './Stats';
import { ServerService } from './services/ServerService';
import { ConsumerModel } from './models/ConsumerModel';

describe('Stats', () => {
  let subject: ShallowWrapper;
  let serverService: ServerService;

  beforeEach(() => {
    serverService = new ServerService();


    serverService.hydrate([
      new ConsumerModel(1, 1, 1),
      new ConsumerModel(2, 2, 2),
    ])

    subject = shallow(
      <Stats
        serverService={serverService}
      />);
  });

  it('should render utilization for servers', () => {
    expect(subject.find('.server-one-utilization').find('span').at(0).text()).toBe('Server 1 utilization [%]:');
    expect(subject.find('.server-one-utilization').find('span').at(1).text()).toBe(
      (serverService.serverOneUtilization * 100).toFixed(2));

    expect(subject.find('.server-two-utilization').find('span').at(0).text()).toBe('Server 2 utilization [%]:');
    expect(subject.find('.server-two-utilization').find('span').at(1).text()).toBe(
      (serverService.serverOneUtilization * 100).toFixed(2));
  });

  it('should render the average wait time', () => {
    expect(subject.find('.average-wait').find('span').at(0).text()).toBe('Average wait time [minutes]:');
    expect(subject.find('.average-wait').find('span').at(1).text()).toContain(
      `${(serverService.averageWait).toFixed(1)}`);
  });

  it('should render the max wait time', () => {
    expect(subject.find('.maximum-wait').find('span').at(0).text()).toBe('Maximum wait time [minutes]:');
    expect(subject.find('.maximum-wait').find('span').at(1).text()).toContain(
      `${(serverService.maximumWait).toFixed(1)}`);
  });

  it('should render the number of customers served before 1000 minutes', () => {
    expect(subject.find('.consumers-served').find('span').at(0).text()).toBe('Consumers served before 1000 minutes:');
    expect(subject.find('.consumers-served').find('span').at(1).text()).toBe(`${serverService.consumersServed}`);
  });
});