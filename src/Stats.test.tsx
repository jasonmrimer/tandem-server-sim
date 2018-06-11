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

  it('should render the server utilization', () => {
    expect(subject.find('.utilization').find('span').at(0).text()).toBe('Server utilization [%]:');
    expect(subject.find('.utilization').find('span').at(1).text()).toBe(
      (serverService.utilization * 100).toFixed(2));
  });

  it('should render the average wait time', () => {
    expect(subject.find('.average-wait').find('span').at(0).text()).toBe('Average wait time [minutes]:');
    expect(subject.find('.average-wait').find('span').at(1).text()).toContain(
      `${(serverService.averageWait).toFixed(1)}`);
  });
});