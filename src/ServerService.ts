import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _services: ServiceModel[] = [];

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;
    this._consumers.map((consumer) => {
      const startTime = consumer.arrivalTime;
      const seed = Math.random();
      const duration = (-0.7) * Math.log(seed);
      const endTime = startTime + duration;

      this._services.push({startTime, seed, duration, endTime})
    })
  }

  public get services() {
    return this._services;
  }
}