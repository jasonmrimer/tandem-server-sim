import { ConsumerModel } from '../models/ConsumerModel';
import { ServerService } from './ServerService';
import { ServiceModel } from '../models/ServiceModel';

describe('ServerService', () => {
  let subject = new ServerService();

  it('should hydrate with consumers and start serverOneService at arrival times', () => {
    const consumers = [
      new ConsumerModel(1, 2, 3),
      new ConsumerModel(1, 1, 3)
    ];

    subject.hydrate(consumers);

    let serverOneService = subject.serverOneServices[0];
    let serverTwoServices = subject.serverTwoServices[0];

    expect(serverOneService.startTime).toBe(consumers[0].arrivalTime);
    expect(serverOneService.seed).toBeGreaterThanOrEqual(0);
    expect(serverOneService.duration).toBeDefined();
    expect(serverOneService.endTime).toBe(serverOneService.startTime + serverOneService.duration);
    expect(serverOneService.idleTime).toBeGreaterThanOrEqual(0);
    expect(consumers[1].waitTime).toBeGreaterThan(0);
    expect(serverTwoServices.startTime).toBeGreaterThanOrEqual(serverOneService.endTime);
    expect(serverTwoServices.seed).toBeGreaterThanOrEqual(0);
    expect(serverTwoServices.seed).toBeLessThan(1);
    expect(serverTwoServices.duration).toBeDefined();
    expect(serverTwoServices.endTime).toBe(serverTwoServices.startTime + serverTwoServices.duration);
  });

  it('should serve next consumers only after the previous job ends', () => {
    const previousService = new ServiceModel(1, 2, 3);
    const nextConsumer = new ConsumerModel(1, 1, 1);
    const nextStartTime = subject.calculateStartTime(previousService, nextConsumer);
    expect(nextStartTime).toBe(4);
  });

  it('should calculate idleTime time when there is no consumer waiting', () => {
    const service = new ServiceModel(1, 2, 3);
    const nextConsumer = new ConsumerModel(1, 1, 10);
    const idleTime = subject.calculateIdleTime(service, nextConsumer);
    expect(idleTime).toBe(6);
  });

  it('should cause the consumer to wait when there is no serverOneService available', () => {
    const currConsumer = new ConsumerModel(1, 1, 1);
    const currService = new ServiceModel(5, 1, 1);
    const waitTime = subject.calculateWaitTime(currService, currConsumer);
    expect(waitTime).toBe(4);
  });

  it('should calculate the utilization based on serverOneService over entire sim', () => {
    const services = [
      new ServiceModel(1, 1, 2),
      new ServiceModel(5, 1, 2),
      new ServiceModel(8, 1, 2),
    ];
    expect(subject.calculateUtilization(services)).toBe(0.6);
  });

  it('should calculate the average wait time for its consumers', () => {
    let consumerModel1 = new ConsumerModel(1, 1, 1);
    let consumerModel2 = new ConsumerModel(1, 1, 1);
    let consumerModel3 = new ConsumerModel(1, 1, 1);
    consumerModel1.waitTime = 1;
    consumerModel2.waitTime = 2;
    consumerModel3.waitTime = 3;

    const consumers = [
      consumerModel1,
      consumerModel2,
      consumerModel3,
    ]

    expect(subject.calculateAverageWait(consumers)).toBe(2);
  });

  it('should calculate the max wait time for consumers', () => {
    let consumerModel1 = new ConsumerModel(1, 1, 1);
    let consumerModel2 = new ConsumerModel(1, 1, 1);
    let consumerModel3 = new ConsumerModel(1, 1, 1);
    consumerModel1.waitTime = 1;
    consumerModel2.waitTime = 2;
    consumerModel3.waitTime = 3;

    const consumers = [
      consumerModel1,
      consumerModel2,
      consumerModel3,
    ]

    expect(subject.calculateMaximumWait(consumers)).toBe(3);
  });

  it('should calculate the number of consumers served before 1000 minutes', () => {
    const services = [
      new ServiceModel(1, 1, 2),
      new ServiceModel(5, 1, 2),
      new ServiceModel(8, 1, 2000),
    ];
    expect(subject.calculateConsumersServedBeforeLimit(services, 1000)).toBe(2);
  });
});