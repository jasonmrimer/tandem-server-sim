import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _services: ServiceModel[] = [];
  private _utilization: number = 0;

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;
    this.createServices();
  }

  public get utilization() {
    return this._utilization;
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

  public calculateWaitTime(currentService: ServiceModel, currentConsumer: ConsumerModel) {
    let waitTime = 0;

    if (currentService.startTime > currentConsumer.arrivalTime) {
      waitTime = currentService.startTime - currentConsumer.arrivalTime;
    }

    return waitTime;
  }

  public calculateUtilization(services: ServiceModel[]) {
    let totalServiceTime = 0;
    services.map((service) => {
      totalServiceTime += service.duration;
    });
    return totalServiceTime / services[services.length - 1].endTime;

  }

  private createServices() {
    this._consumers.map((consumer, index) => {
      const startTime = this.calculateStartTime(this._services, consumer);

      const seed = Math.random();
      const duration = (-0.7) * Math.log(seed);
      let service = new ServiceModel(startTime, seed, duration);

      consumer.waitTime = this.calculateWaitTime(service, consumer);
      service.idleTime = this.calculateIdleTime(service, this._consumers[index + 1]);

      this._services.push(service)
      this._utilization = this.calculateUtilization(this._services);
    })
  }
}