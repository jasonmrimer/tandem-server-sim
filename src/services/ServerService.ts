import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _services: ServiceModel[] = [];
  private _utilization: number = 0;
  private _averageWait: number = 0;
  private _maximumWait: number = 0;

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;

    this.createServices();
    
    this._utilization = this.calculateUtilization(this._services);
    this._averageWait = this.calculateAverageWait(this._consumers);
    this._maximumWait = this.calculateMaximumWait(this._consumers);
  }


  public get utilization() {
    return this._utilization;
  }

  public get services() {
    return this._services;
  }

  public get averageWait() {
    return this._averageWait;
  }

  public get maximumWait() {
    return this._maximumWait;
  }

  public calculateStartTime(previousService: ServiceModel, consumer: ConsumerModel) {
    if (previousService) {
      let endTime = previousService.endTime;
      return endTime > consumer.arrivalTime ? endTime : consumer.arrivalTime;
    }

    return consumer.arrivalTime;
  }

  public calculateIdleTime(currentService: ServiceModel, nextConsumer: ConsumerModel) {
    if (nextConsumer) {
      let idleTime = nextConsumer.arrivalTime - currentService.endTime;
      return idleTime > 0 ? idleTime : 0;
    }

    return 0;
  }

  public calculateWaitTime(currentService: ServiceModel, currentConsumer: ConsumerModel) {
    let waitTime = currentService.startTime - currentConsumer.arrivalTime;

    return waitTime > 0 ? waitTime : 0;
  }

  public calculateUtilization(services: ServiceModel[]) {
    let totalServiceTime = 0;
    services.map((service) => {
      totalServiceTime += service.duration;
    });
    return totalServiceTime / services[services.length - 1].endTime;

  }

  public calculateAverageWait(consumers: ConsumerModel[]) {
    let totalWait = 0;
    consumers.map(consumer => totalWait += consumer.waitTime);

    return (consumers.length > 0) ? (totalWait / consumers.length) : 0;
  }

  public calculateMaximumWait(consumers: ConsumerModel[]) {
    return Math.max.apply(Math, consumers.map((consumer) => consumer.waitTime));
  }

  private createServices() {
    this._consumers.map((consumer, index) => {
      const prevService = this._services[this._services.length - 1];
      const nextConsumer = this._consumers[index + 1];

      const startTime = this.calculateStartTime(prevService, consumer);
      const seed = Math.random();
      const duration = (-0.7) * Math.log(seed);

      let service = new ServiceModel(startTime, seed, duration);

      consumer.waitTime = this.calculateWaitTime(service, consumer);
      service.idleTime = this.calculateIdleTime(service, nextConsumer);

      this._services.push(service)
    })
  }
}