import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _services: ServiceModel[] = [];

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;
    this._consumers.map((consumer) => {
      const startTime = this.calculateNextStartTime(this._services, consumer);
      const seed = Math.random();
      const duration = (-0.7) * Math.log(seed);

      this._services.push(new ServiceModel(startTime, seed, duration))
    })
  }

  public get services() {
    return this._services;
  }

  public calculateNextStartTime(services: ServiceModel[], nextConsumer: ConsumerModel) {
    let startTime = nextConsumer.arrivalTime;
    const lastService = services[services.length - 1];

    if (lastService && lastService.endTime > nextConsumer.arrivalTime) {
      return lastService.endTime;
    }

    return startTime;
  }
}