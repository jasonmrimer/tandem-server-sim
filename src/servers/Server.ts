import { ServiceModel } from '../models/ServiceModel';
import { ConsumerModel } from '../models/ConsumerModel';

export interface Server {
  hydrate(consumers: ConsumerModel[]): void;
  utilization: number;
  services(): ServiceModel[];
  averageWait(): number;
  maximumWait(): number;
  calculateUtilization(services: ServiceModel[]): number;
  calculateWaitTime(currentService: ServiceModel, currentConsumer: ConsumerModel): number;
  createAllServices(): ServiceModel[];
  createSingleService(blockingServices: ServiceModel[], currentConsumer: ConsumerModel): ServiceModel;
}