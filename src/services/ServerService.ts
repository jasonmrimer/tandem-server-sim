import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

export class ServerService {
  private _consumers: ConsumerModel[];
  private _serverOneServices: ServiceModel[] = [];
  private _serverTwoServices: ServiceModel[] = [];
  private _serverOneUtilization: number = 0;
  private _serverTwoUtilization: number = 0;
  private _averageWaitForServerOne: number = 0;
  private _averageWaitForServerTwo: number = 0;
  private _maximumWaitForServerOne: number = 0;
  private _maximumWaitForServerTwo: number = 0;
  private _consumersServed: number = 0;

  public hydrate(consumers: ConsumerModel[]) {
    this._consumers = consumers;

    this.createServices();

    this._serverOneUtilization = this.calculateUtilization(this._serverOneServices);
    this._serverTwoUtilization = this.calculateUtilization(this._serverTwoServices);
    this._averageWaitForServerOne = this.calculateAverageWaitForServerOne(this._consumers);
    this._averageWaitForServerTwo = this.calculateAverageWaitForServerTwo(this._consumers);
    this._maximumWaitForServerOne = this.calculateMaximumWaitForServerOne(this._consumers);
    this._maximumWaitForServerTwo = this.calculateMaximumWaitForServerTwo(this._consumers);
    this._consumersServed = this.calculateConsumersServedBeforeLimit(this._serverOneServices, 1000);
  }


  public get serverOneUtilization() {
    return this._serverOneUtilization;
  }

  public get serverTwoUtilization() {
    return this._serverTwoUtilization;
  }

  public get serverOneServices() {
    return this._serverOneServices;
  }

  public get serverTwoServices() {
    return this._serverTwoServices;
  }

  public get averageWaitForServerOne() {
    return this._averageWaitForServerOne;
  }

  public get averageWaitForServerTwo() {
    return this._averageWaitForServerTwo;
  }

  public get maximumWaitForServerOne() {
    return this._maximumWaitForServerOne;
  }

  public get maximumWaitForServerTwo() {
    return this._maximumWaitForServerTwo;
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

  public getServerOneIdleTime(
    prevService: ServiceModel,
    currService: ServiceModel,
    currConsumer: ConsumerModel
  ) {
    let idleTime = currConsumer.arrivalTime;

    if (prevService) {
      if (prevService.endTime < currService.startTime) {
        idleTime = currService.startTime - prevService.endTime;
      }
    }

    return idleTime;
  }

  public calculateServerOneIdleTimes(serverOneServices: ServiceModel[], consumers: ConsumerModel[]) {
    serverOneServices.map((service, index) => {
      service.idleTime = this.getServerOneIdleTime(
        serverOneServices[index - 1],
        service,
        consumers[index]
      )
    });
  }

  public calculateServerTwoIdleTimes(serverOneServices: ServiceModel[], serverTwoServices: ServiceModel[]) {
    serverTwoServices.map((service, index) => {
      service.idleTime = this.getServerTwoIdleTime(
        serverOneServices[index],
        serverTwoServices[index - 1],
        service
      )
    })
  }

  public getServerTwoIdleTime(
    currServerOneService: ServiceModel,
    prevServerTwoService: ServiceModel,
    currServerTwoService: ServiceModel
  ) {

    const awaitingServerOne = (prevServerTwo: ServiceModel, currServerTwo: ServiceModel) => {
      return prevServerTwo.endTime < currServerTwo.startTime;
    };

    let idleTime = 0;

    if (prevServerTwoService) {

      if (awaitingServerOne(prevServerTwoService, currServerTwoService)) {
        idleTime = currServerOneService.endTime - prevServerTwoService.endTime;
      }
    }

    return idleTime;
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

  public calculateAverageWaitForServerOne(consumers: ConsumerModel[]) {
    let totalWait = 0;
    consumers.map(consumer => totalWait += consumer.waitForServerOneTime);

    return (consumers.length > 0) ? (totalWait / consumers.length) : 0;
  }

  public calculateAverageWaitForServerTwo(consumers: ConsumerModel[]) {
    let totalWait = 0;
    consumers.map(consumer => totalWait += consumer.waitForServerTwoTime);

    return (consumers.length > 0) ? (totalWait / consumers.length) : 0;
  }

  public calculateMaximumWaitForServerOne(consumers: ConsumerModel[]) {
    return Math.max.apply(Math, consumers.map((consumer) => consumer.waitForServerOneTime));
  }

  public calculateMaximumWaitForServerTwo(consumers: ConsumerModel[]) {
    return Math.max.apply(Math, consumers.map((consumer) => consumer.waitForServerTwoTime));
  }

  public calculateConsumersServedBeforeLimit(services: ServiceModel[], timeLimit: number) {
    return services.filter((service) => service.endTime <= timeLimit).length;
  }

  public calculateWaitForServerTwoTime(prevServerTwoService: ServiceModel, currServerOneService: ServiceModel) {
    let waitTime = 0;

    if (prevServerTwoService) {
      waitTime = prevServerTwoService.endTime - currServerOneService.endTime;
    }

    return waitTime > 0 ? waitTime : 0;
  }

  public calculateServerTwoStartTime(
    prevServerTwoService: ServiceModel,
    currServerOneService: ServiceModel
  ) {
    let startTime = currServerOneService.endTime;

    if (prevServerTwoService) {
      return startTime > prevServerTwoService.endTime ? startTime : prevServerTwoService.endTime
    }

    return startTime;
  }

  public createServerOneService(
    prevService: ServiceModel,
    currConsumer: ConsumerModel,
  ) {
    const startTime = this.calculateStartTime(prevService, currConsumer);
    const seed = Math.random();
    const duration = (-0.7) * Math.log(seed);

    let service = new ServiceModel(startTime, seed, duration);

    currConsumer.waitForServerOneTime = this.calculateWaitTime(service, currConsumer);
    return service;
  }

  public createServerTwoService(
    prevServerTwoService: ServiceModel,
    serverOneService: ServiceModel,
    consumer: ConsumerModel
  ) {
    const seed = Math.random();
    const duration = (-0.9) * Math.log(seed);

    consumer.waitForServerTwoTime = this.calculateWaitForServerTwoTime(prevServerTwoService, serverOneService);
    const startTime = this.calculateServerTwoStartTime(prevServerTwoService, serverOneService);
    return new ServiceModel(startTime, seed, duration);
  }

  private createServices() {
    this._consumers.map((consumer) => {
      const prevServerOneService = this._serverOneServices[this._serverOneServices.length - 1];
      const serverOneService = this.createServerOneService(prevServerOneService, consumer);
      this._serverOneServices.push(serverOneService);

      const prevServerTwoService = this._serverTwoServices[this._serverTwoServices.length - 1];
      this._serverTwoServices.push(this.createServerTwoService(prevServerTwoService, serverOneService, consumer));
    })

    this.calculateServerOneIdleTimes(this._serverOneServices, this._consumers);
    this.calculateServerTwoIdleTimes(this._serverOneServices, this._serverTwoServices);
  }
}