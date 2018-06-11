import { ConsumerModel } from './ConsumerModel';
import { ServerService } from './ServerService';

describe('ServerService', () => {
  it('should hydrate with consumers and start service at arrival times', () => {
    let subject = new ServerService();
    const consumers = [new ConsumerModel(1, 2, 3)];

    subject.hydrate(consumers);
    expect(subject.services[0].startTime).toBe(consumers[0].arrivalTime);
  });
});