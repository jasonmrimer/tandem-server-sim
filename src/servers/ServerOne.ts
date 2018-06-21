import { Server } from './Server';
import { ConsumerModel } from '../models/ConsumerModel';
import { ServiceModel } from '../models/ServiceModel';

export class ServerOne implements Server {
  private _services: ServiceModel[] = [];
  private _utilization: number = 0;
  private _consumers: ConsumerModel[] = [];

  averageWait(): number {
    return 0;
  }

  hydrate(consumers: ConsumerModel[]): void {
    this._consumers = consumers;

    this._services = this.createAllServices();

    this._utilization = this.calculateUtilization(this._services);
  }

  createSingleService(blockingServices: ServiceModel[], currentConsumer: ConsumerModel): ServiceModel {
    const previousService = blockingServices[0];

    const startTime = this.calculateWaitTime(previousService, currentConsumer);
    const seed = Math.random();
    const duration = (-0.7) * Math.log(seed);

    let service = new ServiceModel(startTime, seed, duration);

    currentConsumer.waitForServerOneTime = this.calculateWaitTime(service, currentConsumer);
    return service;
  }

  createAllServices() {
    let allServices: ServiceModel[] = [];
    this._consumers.map((consumer) => {
      const waitingServices = [this._services[this._services.length - 1]];
      const serverOneService = this.createSingleService(waitingServices, consumer);
      allServices.push(serverOneService);
    })
    return allServices;
  }

  maximumWait(): number {
    return 0;
  }

  services(): ServiceModel[] {
    return this._services;
  }

  get utilization(): number {
    return this._utilization;
  }

  calculateUtilization(services: ServiceModel[]): number {
    let totalServiceTime = 0;
    services.map((service) => {
      totalServiceTime += service.duration;
    });
    return totalServiceTime / services[services.length - 1].endTime;
  }

  calculateWaitTime(currentService: ServiceModel, currentConsumer: ConsumerModel): number {
    let waitTime = currentService.startTime - currentConsumer.arrivalTime;

    return waitTime > 0 ? waitTime : 0;
  }
}