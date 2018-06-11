import { ConsumerModel } from './ConsumerModel';
import { ServerService } from './ServerService';

describe('ServerService', () => {
  it('should hydrate with consumers and start service at arrival times', () => {
    let subject = new ServerService();
    const consumers = [new ConsumerModel(1, 2, 3)];

    subject.hydrate(consumers);


    let service = subject.services[0];
    expect(service.startTime).toBe(consumers[0].arrivalTime);
    expect(service.seed).toBeGreaterThanOrEqual(0);
    expect(service.seed).toBeLessThan(1);
    expect(service.duration).toBeDefined();
    expect(service.endTime).toBe(service.startTime + service.duration);
  });
});