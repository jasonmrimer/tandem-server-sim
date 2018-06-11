import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Route } from 'react-router';
import { shallow, ShallowWrapper } from 'enzyme';
import { ConsumerService } from './services/ConsumerService';
import { ServerService } from './services/ServerService';

describe('App', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<App/>);
  });

  it('should mount with consumer and server services to pass into children', () => {
    expect(subject.state('consumerService')).toBeDefined();
    expect(subject.state('serverService')).toBeDefined();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should route to different links', () => {
    expect(subject.find(Route).at(0).prop('path')).toBe('/');
    expect(subject.find(Route).at(1).prop('path')).toBe('/stats');
  });

  it('should hydrate a consumer service and set the state with provided consumers', () => {
    const consumerService = (subject.state('consumerService')) as ConsumerService;
    const consumers = consumerService.consumers;
    expect(consumers.length).toBeGreaterThan(1);
    expect(consumers[consumers.length - 1].arrivalTime).toBeLessThanOrEqual(1000);
  });

  it('should hydrate a server 1 service and set the state with provided server', () => {
    const serverService = (subject.state('serverService')) as ServerService;
    const services = serverService.services;
    expect(services.length).toBeGreaterThan(1);
  });
});
