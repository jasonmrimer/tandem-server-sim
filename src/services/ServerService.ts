import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _serverOneServices: ServiceModel[] = [];
  private _serverTwoServices: ServiceModel[] = [];
  private _utilization: number = 0;
  private _averageWait: number = 0;
  private _maximumWait: number = 0;
  private _consumersServed: number = 0;

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;

    this.createServices();
    
    this._utilization = this.calculateUtilization(this._serverOneServices);
    this._averageWait = this.calculateAverageWait(this._consumers);
    this._maximumWait = this.calculateMaximumWait(this._consumers);
    this._consumersServed = this.calculateConsumersServedBeforeLimit(this._serverOneServices, 1000);
  }


  public get utilization() {
    return this._utilization;
  }

  public get serverOneServices() {
    return this._serverOneServices;
  }

  public get serverTwoServices() {
    return this._serverTwoServices;
  }

  public get averageWait() {
    return this._averageWait;
  }

  public get maximumWait() {
    return this._maximumWait;
  }

  public get consumersServed() {
    return this._consumersServed;
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

  public calculateConsumersServedBeforeLimit(services: ServiceModel[], timeLimit: number) {
    return services.filter((service) => service.endTime <= timeLimit).length;
  }

  public createServerOneService(
    prevService: ServiceModel,
    currConsumer: ConsumerModel,
    nextConsumer: ConsumerModel
  ) {
      const startTime = this.calculateStartTime(prevService, currConsumer);
      const seed = Math.random();
      const duration = (-0.7) * Math.log(seed);

      let service = new ServiceModel(startTime, seed, duration);

      currConsumer.waitTime = this.calculateWaitTime(service, currConsumer);
      service.idleTime = this.calculateIdleTime(service, nextConsumer);
      return service;
  }

  private createServices() {
    this._consumers.map((consumer, index) => {
      const prevService = this._serverOneServices[this._serverOneServices.length - 1];
      const nextConsumer = this._consumers[index + 1];
      const serverOneService = this.createServerOneService(prevService, consumer, nextConsumer);
      this._serverOneServices.push(serverOneService);

      const serverTwoStartTime = serverOneService.endTime;
      this._serverTwoServices.push(new ServiceModel(serverTwoStartTime));
    })
  }
}