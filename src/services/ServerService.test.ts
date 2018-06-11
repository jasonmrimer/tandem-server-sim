import { ConsumerModel } from '../models/ConsumerModel';
import { ServerService } from './ServerService';
import { ServiceModel } from '../models/ServiceModel';

describe('ServerService', () => {
  let subject = new ServerService();

  it('should hydrate with consumers and start service at arrival times', () => {
    const consumers = [
      new ConsumerModel(1, 2, 3),
      new ConsumerModel(1, 1, 3)
    ];

    subject.hydrate(consumers);

    let service = subject.services[0];
    expect(service.startTime).toBe(consumers[0].arrivalTime);
    expect(service.seed).toBeGreaterThanOrEqual(0);
    expect(service.seed).toBeLessThan(1);
    expect(service.duration).toBeDefined();
    expect(service.endTime).toBe(service.startTime + service.duration);
    expect(service.idleTime).toBeGreaterThanOrEqual(0);
    expect(consumers[1].waitTime).toBeGreaterThan(0);
  });

  it('should serve next consumers only after the previous job ends', () => {
    const services = [new ServiceModel(1, 2, 3)];
    const nextConsumer = new ConsumerModel(1, 1, 1);
    const nextStartTime = subject.calculateStartTime(services, nextConsumer);
    expect(nextStartTime).toBe(4);
  });

  it('should calculate idleTime time when there is no consumer waiting', () => {
    const service = new ServiceModel(1, 2, 3);
    const nextConsumer = new ConsumerModel(1, 1, 10);
    const idleTime = subject.calculateIdleTime(service, nextConsumer);
    expect(idleTime).toBe(6);
  });

  it('should cause the consumer to wait when there is no service available', () => {
    const currConsumer = new ConsumerModel(1, 1, 1);
    const currService = new ServiceModel(5, 1, 1);
    const waitTime = subject.calculateWaitTime(currService, currConsumer);
    expect(waitTime).toBe(4);
  });
});