import { ConsumerService } from './ConsumerService';

describe('ConsumerService', () => {

  it('should create consumers until clock reaches maximum time', () => {
    let subject: ConsumerService = new ConsumerService();
    subject.hydrate(1000);

    expect(subject.consumers.length).toBeGreaterThan(0);
    expect(subject.simClock).toBeGreaterThan(1000);
    expect(subject.consumers[subject.consumers.length - 1].arrivalTime).toBeLessThan(1000);
  });
});