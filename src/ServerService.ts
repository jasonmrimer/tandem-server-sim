import { ConsumerModel } from './ConsumerModel';
import { ServiceModel } from './ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _services: ServiceModel[] = [];

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;
    this._consumers.map((consumer, index) => {
      const startTime = this.calculateStartTime(this._services, consumer);
      const seed = Math.random();
      const duration = (-0.7) * Math.log(seed);
      let service = new ServiceModel(startTime, seed, duration);

      service.idleTime = this.calculateIdleTime(service, this._consumers[index + 1]);

      this._services.push(service)
    })
  }

  public get services() {
    return this._services;
  }

  public calculateStartTime(services: ServiceModel[], consumer: ConsumerModel) {
    let startTime = consumer.arrivalTime;
    const previousService = services[services.length - 1];

    if (previousService && previousService.endTime > consumer.arrivalTime) {
      return previousService.endTime;
    }

    return startTime;
  }

  public calculateIdleTime(currentService: ServiceModel, nextConsumer: ConsumerModel) {
    let idleTime = 0;

    if (nextConsumer) {
      if (currentService.endTime < nextConsumer.arrivalTime) {
        idleTime = nextConsumer.arrivalTime - currentService.endTime;
      }
    }

    return idleTime;
  }
}