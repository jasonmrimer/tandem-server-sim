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
    let serverTwoService = subject.serverTwoServices[0];

    expect(serverOneService.startTime).toBe(consumers[0].arrivalTime);
    expect(serverOneService.seed).toBeGreaterThanOrEqual(0);
    expect(serverOneService.duration).toBeDefined();
    expect(serverOneService.endTime).toBe(serverOneService.startTime + serverOneService.duration);
    expect(serverOneService.idleTime).toBeGreaterThanOrEqual(0);
    expect(consumers[1].waitForServerOneTime).toBeGreaterThan(0);
    expect(serverTwoService.startTime).toBeGreaterThanOrEqual(serverOneService.endTime);
    expect(subject.serverTwoServices[1].startTime).toBeGreaterThanOrEqual(serverTwoService.endTime);
    expect(serverTwoService.seed).toBeGreaterThanOrEqual(0);
    expect(serverTwoService.seed).toBeLessThan(1);
    expect(serverTwoService.duration).toBeDefined();
    expect(serverTwoService.endTime).toBe(serverTwoService.startTime + serverTwoService.duration);
  });

  it('should serve next consumers only after the previous job ends', () => {
    const previousService = new ServiceModel(1, 2, 3);
    const nextConsumer = new ConsumerModel(1, 1, 1);
    const nextStartTime = subject.calculateStartTime(previousService, nextConsumer);
    expect(nextStartTime).toBe(4);
  });

  it('should calculate idle time for server two when there is no consumer waiting', () => {
    const serverOneServices = [
      new ServiceModel(1, 2, 3),
      new ServiceModel(8, 2, 2),
      new ServiceModel(10, 2, 3),
    ];

    const serverTwoServices = [
      new ServiceModel(4, 2, 3),
      new ServiceModel(10, 2, 8),
      new ServiceModel(18, 2, 3),
    ];
    subject.calculateServerTwoIdleTimes(serverOneServices, serverTwoServices);
    expect(serverTwoServices[0].idleTime).toBe(0);
    expect(serverTwoServices[1].idleTime).toBe(3);
    expect(serverTwoServices[2].idleTime).toBe(0);
  });

  it('should return an idle time when waiting on server one', () => {
    const idleTime = subject.getServerTwoIdleTime(
      new ServiceModel(1, 1, 5),
      new ServiceModel(1, 1, 1),
      new ServiceModel(6, 1, 1)
    );
    expect(idleTime).toBe(4)
  });

  // it('should return an idle time when waiting on server two', () => {
  //   const idleTime = subject.getServerTwoIdleTime(
  //     new ServiceModel(1, 1, 5),
  //     new ServiceModel(1, 1, 9),
  //     new ServiceModel(10, 1, 1)
  //   );
  //   expect(idleTime).toBe(4)
  // });

  it('should return no idle time when immediate start for server two', () => {
    const idleTime = subject.getServerTwoIdleTime(
      new ServiceModel(1, 1, 5),
      new ServiceModel(1, 1, 7),
      new ServiceModel(8, 1, 1)
    );
    expect(idleTime).toBe(0)
  });

  it('should return an idle time when waiting on a consumer to arrive', () => {
    const idleTime = subject.getServerOneIdleTime(
      new ServiceModel(1, 1, 1),
      new ServiceModel(8, 1, 4),
      new ConsumerModel(1, 1, 8)
    );

    expect(idleTime).toBe(6);
  });

  it('should cause the consumer to wait when there is no serverOneService available', () => {
    const currConsumer = new ConsumerModel(1, 1, 1);
    const currService = new ServiceModel(5, 1, 1);
    const waitTime = subject.calculateWaitTime(currService, currConsumer);
    expect(waitTime).toBe(4);
  });

  it('should cause the consumer to wait when there is no serverTwoService available', () => {
    const currServerOneService = new ServiceModel(1, 1, 1);
    const prevServerTwoService = new ServiceModel(5, 1, 1);
    const waitTime = subject.calculateWaitForServerTwoTime(prevServerTwoService, currServerOneService);
    expect(waitTime).toBe(4);
  });

  it('should calculate the serverOneUtilization based on serverOneService over entire sim', () => {
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
    consumerModel1.waitForServerOneTime = 1;
    consumerModel2.waitForServerOneTime = 2;
    consumerModel3.waitForServerOneTime = 3;

    const consumers = [
      consumerModel1,
      consumerModel2,
      consumerModel3,
    ]

    expect(subject.calculateAverageWaitForServerOne(consumers)).toBe(2);
  });

  it('should calculate the max wait time for consumers', () => {
    let consumerModel1 = new ConsumerModel(1, 1, 1);
    let consumerModel2 = new ConsumerModel(1, 1, 1);
    let consumerModel3 = new ConsumerModel(1, 1, 1);
    consumerModel1.waitForServerOneTime = 1;
    consumerModel2.waitForServerOneTime = 2;
    consumerModel3.waitForServerOneTime = 3;

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

  it('should calculate start time for server two based on availability', () => {
    let prevServerTwoService = new ServiceModel(1, 1, 3);
    let currServerOneService = new ServiceModel(1, 1, 1);

    let startTime = subject.calculateServerTwoStartTime(prevServerTwoService, currServerOneService);
    expect(startTime).toBe(4);

    prevServerTwoService = new ServiceModel(1, 1, 1);
    currServerOneService = new ServiceModel(1, 1, 6);

    startTime = subject.calculateServerTwoStartTime(prevServerTwoService, currServerOneService);
    expect(startTime).toBe(7);
  });
});