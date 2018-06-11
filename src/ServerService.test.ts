import { ConsumerModel } from './ConsumerModel';
import { ServerService } from './ServerService';
import { ServiceModel } from './ServiceModel';

describe('ServerService', () => {
  let subject = new ServerService();

  it('should hydrate with consumers and start service at arrival times', () => {
    const consumers = [new ConsumerModel(1, 2, 3)];

    subject.hydrate(consumers);

    let service = subject.services[0];
    expect(service.startTime).toBe(consumers[0].arrivalTime);
    expect(service.seed).toBeGreaterThanOrEqual(0);
    expect(service.seed).toBeLessThan(1);
    expect(service.duration).toBeDefined();
    expect(service.endTime).toBe(service.startTime + service.duration);
  });

  it('should serve next consumers only after the previous job ends', () => {
    const services = [new ServiceModel(1, 2, 3)];
    const nextConsumer = new ConsumerModel(1, 1, 1);
    const nextStartTime = subject.calculateNextStartTime(services, nextConsumer);
    expect(nextStartTime).toBe(4);
  });
});